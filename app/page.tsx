import { Taskview, TaskTab, Task, createTabsFromObject } from "./components/Taskview";
import exampleTasks from "./components/ExampleTasks";

export default function Home() {
  return (
    <Taskview>
      { createTabsFromObject(exampleTasks) }
    </Taskview>
  );
}
