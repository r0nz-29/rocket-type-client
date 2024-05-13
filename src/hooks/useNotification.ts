import {useToast} from "@chakra-ui/react";

export default function useNotifications() {
  const toast = useToast();

  function errorNotification(error: string) {
    return toast({
      title: "Error: " + error,
      isClosable: true,
      status: "error",
      duration: 3000
    });
  }

  return {
    errorNotification
  };
}