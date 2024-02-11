import clientGif from "/gifs/client.gif";
import adminGif from "/gifs/admin.gif";
import employeeGif from "/gifs/employee.gif";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

const dataWelcome = [
  {
    title: "Client",
    text: "Access your account and manage your reservations as a client.",
    img: clientGif,
    type: "login",
  },
  {
    title: "Administrator",
    text: "Log in or register to manage system settings and user accounts.",
    img: adminGif,
    type: "register",
  },
  {
    title: "Employee",
    text: "Log in to manage your work schedule and view customer reservations.",
    img: employeeGif,
    type: "login",
  },
];

const WelcomePage = () => {
  return (
    <div className="bg-gradient-to-br h-screen from-purple-200 via-blue-200 to-teal-100">
      <h1 className="welcome_text text-[120px] text-center font-[800] pt-5">
        Welcome!
      </h1>

      <div className="max-w-[1500px] mx-auto mt-10 flex items-center gap-12">
        {dataWelcome.map((item, index) => (
          <div
            key={index}
            className={cn(
              "welcome_card p-8 rounded-[26px] flex flex-col items-center gap-5",
              item.type === "register" ? "-mt-[35px]" : ""
            )}
          >
            <div className="w-[250px] h-[250px] overflow-hidden rounded-full">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-center text-[55px]">{item.title}</h3>

            <p className="text-[30px] text-center font-poppins">{item.text}</p>

            {item.type === "register" ? (
              <div className="mt-5 -mb-[60px] flex items-center gap-5">
                <Button asChild className="rounded-full px-10" size="xl">
                  <Link to="/auth/login">Log in</Link>
                </Button>

                <Button asChild className="rounded-full px-10" size="xl">
                  <Link to="/auth/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-5 -mb-[60px]">
                <Button asChild className="rounded-full" size="xl">
                  <Link to="/auth/login">Log in</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
