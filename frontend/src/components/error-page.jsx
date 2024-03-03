import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";

const ErrorPage = ({ error, status }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-10 py-10">
        <p className="text-6xl font-black">{status}</p>

        <h2 className="text-3xl font-black">{error}</h2>

        <Button asChild className="rounded-full" size="lg">
          <Link to="/">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />

            <span>Take me back home!</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
ErrorPage.propTypes = {
  error: PropTypes.string,
  status: PropTypes.number,
};

export default ErrorPage;
