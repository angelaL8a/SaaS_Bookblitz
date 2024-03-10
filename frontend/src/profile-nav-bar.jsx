import NavigationItem from "./components/admin/navigation-item";
import { motion } from "framer-motion";
import { useGetCompany } from "./hooks/use-company";

const ProfileNavBar = () => {
  const { data: company } = useGetCompany();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex gap-10 items-center max-w-[1200px] mx-auto"
    >
      <NavigationItem
        title="Schedule"
        variant="default"
        to={`/app/${company.url}/profile`}
      />

      <NavigationItem
        title="Employee Details"
        variant="secondary"
        to={`/app/${company.url}/profile/settings`}
      />
    </motion.div>
  );
};

export default ProfileNavBar;
