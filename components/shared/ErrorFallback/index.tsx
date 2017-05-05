import Honeybadger from "@honeybadger-io/js";

interface PropsI {
  error: Error;
}

export const handleErrorHandler = (error: Error, info: { componentStack: string }) => {  
  Honeybadger.notify(`Error from Error Boundry ${error}, Info: ${info}`);
};

const ErrorFallback = ({ error }: PropsI) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
