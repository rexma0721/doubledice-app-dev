
const tokens = [
  {
    name: 'AAVE',
    imageSrc: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xD6DF932A45C0f255f85145f286eA0b292B21C90B'
  },
  {
    name: 'AVAX',
    imageSrc: 'https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b'
  },
  {
    name: 'BNB',
    imageSrc: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x5c4b7CCBF908E64F32e12c6650ec0C96d717f03F'
  },
  {
    name: 'CRV',
    imageSrc: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x172370d5Cd63279eFa6d502DAB29171933a610AF'
  },
  {
    name: 'DAI',
    imageSrc: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
  },
  {
    name: 'DODI',
    imageSrc: 'https://i.ibb.co/gS8VfcV/256x256.png',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x5B03aC408938C97e50db3bC5675d182606A01377'
  },
  {
    name: 'ELON',
    imageSrc: 'https://cryptologos.cc/logos/elongate-elongate-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xE0339c80fFDE91F3e20494Df88d4206D86024cdF'
  },
  {
    name: 'ETH',
    imageSrc: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrncy=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
  },
  {
    name: 'GRT',
    imageSrc: 'https://cryptologos.cc/logos/the-graph-grt-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x5fe2B58c013d7601147DcdD68C143A77499f5531'
  },
  {
    name: 'LINK',
    imageSrc: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39'
  },
  {
    name: 'MANA',
    imageSrc: 'https://cryptologos.cc/logos/decentraland-mana-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4'
  },
  {
    name: 'OCEAN',
    imageSrc: 'https://cryptologos.cc/logos/ocean-protocol-ocean-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x282d8efCe846A88B159800bd4130ad77443Fa1A1'
  },
  {
    name: 'SHIB',
    imageSrc: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec'
  },
  {
    name: 'UNI',
    imageSrc: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xb33EaAd8d922B1083446DC23f610c2567fB5180f'
  },
  {
    name: 'USDC',
    imageSrc: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
  },
  {
    name: 'USDT',
    imageSrc: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
  },
  {
    name: 'WBTC',
    imageSrc: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'
  },
  {
    name: 'WMATIC',
    imageSrc: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
  },
  {
    name: 'YFI',
    imageSrc: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0xDA537104D6A5edd53c6fBba9A898708E465260b6'
  },
  {
    name: 'ZRX',
    imageSrc: 'https://cryptologos.cc/logos/0x-zrx-logo.png?v=022',
    link: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x5559Edb74751A0edE9DeA4DC23aeE72cCA6bE3D5'
  }
]

export default tokens