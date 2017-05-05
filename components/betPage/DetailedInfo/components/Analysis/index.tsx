// @ts-nocheck
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Utils
import * as d3 from "d3"
import { useMediaQuery } from 'react-responsive'

// Components
import * as S from "./StyledComponents";

// Types
import { Bet } from "util/types";

interface PropsI {
  chosenBet: Bet | null;
  winningBet: Bet | null;
  currency: string;
  data: Bet[];
}

const DensityChart = ({ data, chosenBet, currency, winningBet }: PropsI) => {
  const isLaptopExtremelySmall = useMediaQuery({ query: '(max-width: 850px)' })
  const isLaptopVerySmall = useMediaQuery({ query: '(max-width: 950px)' })
  const isLaptopSmall = useMediaQuery({ query: '(max-width: 1100px)' })
  const isLaptop = useMediaQuery({ query: '(max-width: 1200px)' })
  const isLaptopBig = useMediaQuery({ query: '(max-width: 1300px)' })
  const [WrapperGroup, setWrapperGroup] = useState(null);
  const [screenWidth, setScreenWidth] = useState<number | null>(null)
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  const isSafari = navigator.vendor.match(/apple/i) &&
    !navigator.userAgent.match(/crios/i) &&
    !navigator.userAgent.match(/fxios/i) &&
    !navigator.userAgent.match(/Opera|OPT\//);

  let width = 950;
  if (isLaptopExtremelySmall) width = 520
  else if (isLaptopVerySmall) width = 560
  else if (isLaptopSmall) width = 660
  else if (isLaptop) width = 760
  else if (isLaptopBig) width = 860
  if (isSafari && isLaptopExtremelySmall) width = width * 1.9

  const margin = { top: 20, right: 20, bottom: 100 };
  const height = 210 - margin.top - margin.bottom;

  const wrap = (text, width) => {
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.5, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text.text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");
      const theIndex = words.pop()
      line.push(theIndex)
      tspan.text(line.join(" "));
      line = [];
      tspan = text.append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", ++lineNumber * lineHeight + dy + "em")
        .text(theIndex);

      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }

  const draw = () => {// Zeros are added between each index in data array so that the chart goes to zero between two data arr
    let newData = [...data];

    for (let i = 1; i < data.length; i++) {
      newData.splice(2 * i - 1, 0, {
        index: i + 0.5,
        totalSupply: 0,
        name: `nothing ${i + 0.5}`,
        color: "transparent",
      });
    }
    newData = [
      { index: 0.5, totalSupply: 0, name: "nothing 0", color: "transparent" },
      ...newData,
      {
        index: data.length + 0.5,
        totalSupply: 0,
        name: `nothing ${data.length + 0.5}`,
        color: "transparent",
      },
    ];

    // D3 Chart setup
    const xScale = d3
      .scaleBand()
      .domain(newData.map((d: Bet) => d.index))
      .range([0, width * newData.length / (newData.length - 1)]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(newData, (d: Bet) => Number(d.totalSupply))])
      .range([height, 0]);

    const wrapper = d3.select(svgRef.current);

    // Create a Bounding Box
    const bounds = d3.select('#bound');

    // Tooltip
    // Add a circle under our tooltip, right over the “hovered” point
    const tooltip = d3.select("#tooltip");
    const tooltipCircle = bounds
      .append("circle")
      .attr("class", "tooltip-circle")
      .attr("r", 4)
      .attr("stroke", "white")
      .attr("fill", "rgba(0, 0, 0, 0.4)")
      .attr("stroke-width", 1)
      .style("opacity", 0)
      .style("z-index", 100);

    const xAxisLine = bounds
      .append("line")
      .attr("class", "x")
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("opacity", 0)
      .style("z-index", 50)
      .attr("y1", 0)
      .attr("y2", height);
    // Vars
    const yAccessor = (d: Bet) => d.totalSupply;

    // Functions
    function scaleBandInvert(scale: any) {
      var domain = scale.domain();
      var eachBand = scale.step();
      return function (value: number) {
        var index = Math.floor(value / (2 * eachBand) + 1);

        return domain[Math.max(0, Math.min(2 * index - 1, domain.length - 1))];
      };
    }

    // @ts-ignore
    const onMouseMove = (d) => {
      const closestXValue = scaleBandInvert(xScale)(d.offsetX);

      if (closestXValue > data.length) return;
      const currentValue = newData.find(
        (d: Bet) => d.index === closestXValue
      );
      // @ts-ignore
      const closestYValue = yAccessor(currentValue);
      tooltip.select("#tooltip-value").html(Number(closestYValue).toFixed(2));
      // @ts-ignore
      tooltip
        .select("#tooltip-circle")
        .style("background-color", currentValue.color);

      const x = xScale(closestXValue);
      const y = yScale(closestYValue);

      //Grab the x and y position of our closest point,
      //shift our tooltip, and hide/show our tooltip appropriately

      if (data.length > 4 && newData.findIndex((d) => d.index === closestXValue) === 1) {
        tooltip.style(
          "transform",
          `translate(${x}px,${y + 30}px)`
        );
        xAxisLine
          .attr("transform", `translate(${x},${y + 4})`)
          .attr("y2", height - y - 4);
      } else if (
        data.length > 4 &&
        newData.findIndex((d) => d.index === closestXValue) ===
        newData.length - 2
      ) {
        tooltip.style(
          "transform",
          `translate(${x - 150}px,${y + 30}px)`
        );
        xAxisLine
          .attr("transform", `translate(${x},${y + 4})`)
          .attr("y2", height - y - 4);
      } else {
        tooltip.style(
          "transform",
          `translate(${x - 75}px, ${y + 30}px)`
        );
        xAxisLine
          .attr("transform", `translate(${x},${y + 4})`)
          .attr("y2", height - y - 4);
      }

      tooltip.style("opacity", 1);
      tooltipCircle
        .attr("cx", xScale(closestXValue))
        .attr("cy", yScale(closestYValue))
        .style("opacity", 1);
      xAxisLine.style("opacity", 1);
    };

    const onMouseLeave = () => {
      tooltip.style("opacity", 0);
      tooltipCircle.style("opacity", 0);
      xAxisLine.style("opacity", 0);
    };
    d3.select('#svg-area')
      .datum(newData)
      .transition()
      .duration(1000)
      .attr(
        "d",
        d3
          .area()
          .x((d: Bet) => xScale(d.index))
          .y0(height)
          .y1((d: Bet) => yScale(d.totalSupply))
          .curve(d3.curveCardinal)
      );
    d3.select('#svg-line')
      .datum(newData)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke", "#747474")
      .attr("stroke-width", 3)
      .attr(
        "d",
        d3
          .line()
          .x((d: Bet) => xScale(d.index))
          .y((d: Bet) => yScale(d.totalSupply))
          .curve(d3.curveCardinal)
      );

    // Create rectangle for interaction
    bounds
      .append("rect")
      .attr("class", "listening-rect")
      .attr("width", width)
      .attr("height", height)
      .on("mousemove", onMouseMove)
      .on("mouseleave", onMouseLeave);

    setWrapperGroup(wrapper);
  }

  const drawBase = () => {
    let newData = [...data];

    for (let i = 1; i < data.length; i++) {
      newData.splice(2 * i - 1, 0, {
        index: i + 0.5,
        totalSupply: 0,
        name: `nothing ${i + 0.5}`,
        color: "transparent",
      });
    }
    newData = [
      { index: 0.5, totalSupply: 0, name: "nothing 0", color: "transparent" },
      ...newData,
      {
        index: data.length + 0.5,
        totalSupply: 0,
        name: `nothing ${data.length + 0.5}`,
        color: "transparent",
      },
    ];

    // Initial data for animation
    let initData = [...newData].map((d) => ({ ...d, totalSupply: 0 }));

    // Remove previous svg base
    d3.select(svgRef.current)
      .selectAll("*")
      .remove();

    // Graph content
    const wrapper = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(0 , ${margin.top})`);

    // Highlight box
    wrapper.append("g").attr("id", "highlightBox");
    wrapper.append("g").attr("id", "highlightBox-winning");

    // D3 Chart setup
    const xScale = d3
      .scaleBand()
      .domain(newData.map((d: Bet) => d.index))
      .range([0, width * newData.length / (newData.length - 1)]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(newData, (d: Bet) => Number(d.totalSupply))])
      .range([height, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(data.map((d) => `${d.index} ${d.title}`));

    const theXAxis = wrapper
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)

    theXAxis
      .selectAll("g.tick")
      .style("transform", (x: number, i: number) => {
        return `translateX(${(width / data.length) * i}px)`;
      })
      .insert("rect", ":first-child")
      .style("fill", (x: string, i: number) => data[i]?.color)
      .attr("x", 0)
      .attr("width", width / (data.length))
      .attr("height", 4);

    theXAxis.selectAll("g > line").attr("display", "none");
    theXAxis.selectAll(".domain").attr("display", "none");

    // X label
    theXAxis
      .selectAll("text")
      .attr("x", (x: number,) => {
        return `${(width / data.length) * 0.5}`;
      })
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-family", "Helvetica")
      .style("font-size", 12)
      .style("color", "white")
      .call(wrap, xScale.bandwidth());

    // Giving data for initial render line
    const curve = wrapper
      .append("g")
      .append("path")
      .attr("class", "area")
      .attr("width", width)
      .attr("id", "svg-area")
      .datum(initData)
      .attr("fill", "rgba(255, 255, 255, 0.02)")
      .attr("stroke", "none")
      .attr(
        "d",
        d3.area()
          .x((d: Bet) => xScale(d.index))
          .y0(height)
          .y1((d: Bet) => yScale(0))
          .curve(d3.curveCardinal)
      )
      .style("z-index", 10);

    wrapper
      .append("g")
      .append("path")
      .attr("id", "svg-line")
      .datum(initData)
      .attr("fill", "none")
      .attr("stroke", "#747474")
      .attr("stroke-width", 3)
      .attr(
        "d",
        d3
          .line()
          .x((d: Bet) => xScale(d.index))
          .y((d: Bet) => yScale(0))
          .curve(d3.curveCardinal)
      );

    // Create a Bounding Box
    wrapper
      .append("g")
      .attr("id", "bound")
  }

  useEffect(() => {
    if (data && data.length > 0) {
      drawBase()
    }

    draw()
  }, [data, isLaptop, isLaptopBig, isLaptopExtremelySmall, isLaptopVerySmall, isLaptopSmall,])

  const handleHighlightChart = (highlightType) => {
    let theBet
    if (highlightType === 'winning-bet') theBet = winningBet
    else if (highlightType === 'chosen-bet') theBet = chosenBet

    if (highlightType === 'winning-bet') d3.select("#highlightSVG-winning").remove();
    else if (highlightType === 'chosen-bet') d3.select("#highlightSVG").remove();

    // Create rectangle for highlight
    let highlightBox;
    if (highlightType === 'winning-bet') highlightBox = d3.select("#highlightBox-winning");
    else if (highlightType === 'chosen-bet') highlightBox = d3.select("#highlightBox");

    const createGradient = (select) => {
      let id
      let gradientId
      let pathId
      let rectId

      if (highlightType === 'winning-bet') {
        id = "highlightSVG-winning"
        gradientId = 'highlightGradient-winning'
        pathId = "body-clip-winning"
        rectId = 'highlighted-rect-winning'
      }
      else if (highlightType === 'chosen-bet') {
        id = "highlightSVG"
        gradientId = 'highlightGradient'
        pathId = "body-clip"
        rectId = 'highlighted-rect'
      }

      const gradient = select
        .select("svg")
        .attr("id", id)
        .append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("style", `stop-color:${theBet.color};stop-opacity:0.3`);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("style", `stop-color:${theBet.color};stop-opacity:0`);

      select
        .select("svg")
        .append("g")
        .attr("clip-path", `url(#${pathId})`)
        .append("rect")
        .style("fill", `url(#${gradientId})`)
        .attr("x", (Number(theBet.index) - 1) * (width / data.length))
        .attr("y", "0%")
        .attr("width", width / data.length)
        .attr("height", height)
        .attr("id", rectId)
        .style("z-index", 1);
    };

    let pathId
    if (highlightType === 'winning-bet') pathId = "body-clip-winning"
    else if (highlightType === 'chosen-bet') pathId = "body-clip"

    highlightBox
      .append("svg")
      .append("defs")
      .append("clipPath")
      .attr("id", pathId)
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);
    highlightBox.call(createGradient);
  }

  // When a bet option is clicked this function calls to highlight the section
  useEffect(() => {
    if (WrapperGroup && chosenBet?.index) {
      handleHighlightChart('chosen-bet')
    }
  }, [chosenBet, WrapperGroup]);

  useEffect(() => {
    if (WrapperGroup && winningBet) {
      handleHighlightChart('winning-bet')
    }
  }, [WrapperGroup, winningBet]);

  return (
    <S.ChartContainer>
      <S.SVG id="area" preserveAspectRatio="none" ref={svgRef} />
      <S.ToolTip id="tooltip" className="tooltip">
        <S.Circle id="tooltip-circle" />
        <S.ToolTipText>
          <span id="tooltip-value"></span> <S.ToolTipSpan>{currency}</S.ToolTipSpan>
        </S.ToolTipText>
      </S.ToolTip>
    </S.ChartContainer>
  );
};

export default DensityChart;
