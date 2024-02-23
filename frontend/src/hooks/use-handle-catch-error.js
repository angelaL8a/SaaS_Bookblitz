import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useHandleCatchError = () => {
  const { toast } = useToast();

  const logAndToastError = (errorMessage) => {
    console.error(errorMessage);
    toast({
      description: errorMessage,
      variant: "destructive",
    });
  };

  const handleGraphQLError = (error) => {
    const graphQLErrors = error.response.errors;
    if (graphQLErrors && graphQLErrors.length > 0) {
      const errorMessage = graphQLErrors.map((err) => err.message).join(", ");
      logAndToastError(errorMessage);
    }
  };

  const handleAxiosError = (error) => {
    if (error.response && error.response.data) {
      const apiErr = error.response.msg;
      const errorMessage = apiErr ? apiErr : "Something went wrong!";
      logAndToastError(errorMessage);
    } else {
      logAndToastError("Something went wrong!");
    }
  };

  const handleError = ({ error }) => {
    if (typeof error === "string") {
      logAndToastError(error);
    } else if ("response" in error) {
      handleGraphQLError(error);
    } else if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      logAndToastError("Something went wrong!");
    }
  };

  return { handleError };
};
