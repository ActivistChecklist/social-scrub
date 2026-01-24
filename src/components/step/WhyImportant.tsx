'use client';

import { HelpCircle } from 'lucide-react';
import ExpandableSection from '@/components/ui/ExpandableSection';

interface WhyImportantProps {
  content: string;
}

export default function WhyImportant({ content }: WhyImportantProps) {
  return (
    <ExpandableSection
      title="Why is this important?"
      icon={HelpCircle}
      iconColor="text-blue-500"
    >
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        {content}
      </p>
    </ExpandableSection>
  );
}
