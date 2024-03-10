import NavigationItem from "../admin/navigation-item";
import { motion } from "framer-motion";
import { useGetCompany } from "@/hooks/use-company";

const NavigationBar = () => {
  const { data } = useGetCompany();

  if (!data) return;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex gap-10 items-center max-w-[1200px] mx-auto"
    >
      <NavigationItem
        title="Work Schedule"
        variant="default"
        to={`/app/${data.url}/employee`}
      />

      <NavigationItem
        title="Summary"
        variant="secondary"
        to={`/app/${data.url}/employee/summary`}
      />
    </motion.div>
  );
};

export default NavigationBar;
