'use client';

import { Lightbulb } from 'lucide-react';
import ExpandableSection from '@/components/ui/ExpandableSection';

interface CollapsibleHelpProps {
  content: string;
}

export default function CollapsibleHelp({ content }: CollapsibleHelpProps) {
  return (
    <ExpandableSection
      title="Need help? Click for instructions"
      icon={Lightbulb}
      iconColor="text-amber-500"
    >
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        {content}
      </p>
    </ExpandableSection>
  );
}
