import type { FaqItem } from "@/types/project";
import Accordion from "@/components/Accordion";

export default function Faqs({ faqs }: { faqs: FaqItem[] }) {
  return (
    <Accordion
      items={faqs.map((faq) => ({
        key: faq.question,
        title: faq.question,
        content: <p>{faq.answer}</p>,
      }))}
    />
  );
}
