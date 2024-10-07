import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PricingList = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user state from Auth Context

  const handleGetStarted = () => {
    if (user) {
      // If the user is already logged in, redirect to the dashboard
      navigate("/dashboard");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-white border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{item.title}</h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1">
            {item.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {item.price && item.price !== "Free" ? ( // Check if item.price is not null and not "free"
              <>
                <div className="h3">₹</div>
                <div className="text-[5.5rem] leading-none font-bold text-n-1">
                  {item.price}
                </div>
              </>
            ) : (
              <div className="text-[5.5rem] leading-none font-bold text-n-1">
                {item.price === "Free" ? "Free" : null}
              </div>
            )}
          </div>

          <Button
            className="w-full mb-6"
            onClick={handleGetStarted}
            href={item.price ? "/login" : "mailto:am400718@gmail.com"}
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
