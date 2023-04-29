export interface IWizardStepProps {
  label: string;
  children: React.ReactNode;
}

// eslint-disable-next-line no-unused-vars
export const WizardStep = ({ children, label }: IWizardStepProps) => {
  return <section className="h-full">{children}</section>;
};
