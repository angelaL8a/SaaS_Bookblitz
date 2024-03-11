import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <>
      <h3 className="mt-10 mb-2 text-3xl font-bold text-start font-poppins">
        Frequently Asked Questions
      </h3>

      <>
        <Accordion type="single" collapsible>
          {Array.from({ length: 3 }).map((_, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger>Lorem ipsum dolor sit amet??</AccordionTrigger>
              <AccordionContent>Lorem ipsum dolor sit amet?</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    </>
  );
};

export default Faq;
