import { Drawer } from "vaul";
import { Toaster, toast } from "sonner";

function toat() {
  toast.success("this thing is working");
}

export default function Empty() {
  return (
    <>
      <button onClick={toat}>Toast</button>
      <Toaster richColors />
      <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content>
            <Drawer.Handle />
            <p>Content</p>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
