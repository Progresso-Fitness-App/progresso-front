import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

const Dropdown = ({ icon }: { icon: ReactNode }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="User panel">{icon}</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded-md mt-2 mr-2 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="bg rounded-md h-96 w-64 ">
            <h1 className="text-white">Username: etc.</h1>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
