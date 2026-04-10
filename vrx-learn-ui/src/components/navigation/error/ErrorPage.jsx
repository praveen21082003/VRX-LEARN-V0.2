import React from "react";
import Header from "@/components/ui/Header";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ statusCode }) {
  const navigate = useNavigate();

  const errorConfig = {
    404: {
      image: "/404.svg",
      title: "Page Not Found!",
      description:
        "Oops! It looks like you've taken a wrong turn. The page you're looking for doesn't exist or has been moved.",
    },

    403: {
      image: "/403.svg",
      title: "Access Denied!",
      description: "Sorry, you don't have permission to view this page.",
    },
    500: {
      image: "/500.svg",
      title: "Server Error!",
      description:
        "Oops! Something went wrong on our end. We're working to fix it.",
    },
    503: {
      image: "/503.svg",
      title: "Be Right Back!",
      description:
        "The site is currently down for maintenance. Please check back soon.",
    },
  };

  const error = errorConfig[statusCode] || errorConfig[404];
  // const error = errorConfig[500]
  // const error = errorConfig[503]

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-main">
      <div className="h-[5vh] min-h-14 shrink-0">
        <Header menu={true} />
      </div>

      <div className="flex flex-row justify-evenly ">
        <img src={error.image} className="w-1/4 ml-15 mt-8" />
        {/* <a href="https://storyset.com/web">Web illustrations by Storyset</a> */}
        <div className="flex flex-col gap-4 w-1/2 my-auto">
          <h1 className="text-h1 font-bold mx-auto">{error.title}</h1>

          <p className="text-h3 font-semibold w-3/4 mx-auto text-center">
            {error.description}
          </p>

          <Button
            type="button"
            bgClass="bg-primary"
            className="p-2 rounded-lg w-3/4 mx-auto"
            buttonName="Back To Dashboard"
            onClick={() => navigate("/dashboard")}
          />

          <p className="text-ll w-3/4 mx-auto text-center">
            Need Help?
            <a href="https://vrnexgen1.com/" className="underline ml-1">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
