import { Button, SkillSelector } from "ui";

export default function Web() {
  return (
    <div>
      <h1 className="p-8 text-3xl font-bold text-gray-600">Web</h1>

      <div className="p-8">
        <Button>Default Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="warning">Warning Button</Button>
      </div>

      <div className="p-8">
        <Button variant="primary">Primary Button</Button>
        <Button variant="primary" radius="pill">
          Pill Button
        </Button>
        <Button variant="primary" radius="rounded">
          Rounded Button
        </Button>
      </div>

      <SkillSelector setSkillsCallback="" showSelected="" />
    </div>
  );
}
