import NavigationItem from "./navigation-item";
import { useGetCompany } from "@/hooks/use-company";
import { motion } from "framer-motion";

const NavigationBar = () => {
  const { data } = useGetCompany();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex gap-10 items-center max-w-[1200px] mx-auto mt-1"
    >
      <NavigationItem
        title="Schedule"
        variant="default"
        to={`/app/${data.url}/admin`}
      />

      <NavigationItem
        title="Employee Details"
        variant="default"
        to={`/app/${data.url}/admin/employee-details`}
      />

      <NavigationItem
        title="Client Details"
        variant="secondary"
        to={`/app/${data.url}/admin/client-details`}
      />

      <NavigationItem
        title="Payroll Summary"
        variant="secondary"
        to={`/app/${data.url}/admin/payroll-summary`}
      />
    </motion.div>
  );
};

export default NavigationBar;
