import { Button } from '../ui/button';

import * as Dialog from '@radix-ui/react-dialog';

// ----------------------------------------------------------------

interface IGroupLeaveOrDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialog?: boolean;
  handleDeleteGroup?: () => void;
  handleLeaveGroup?: () => void;
}

const GroupLeaveOrDeleteDialog: React.FC<IGroupLeaveOrDeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  isDeleteDialog = false,
  handleDeleteGroup,
  handleLeaveGroup,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* <Dialog.Trigger asChild></Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 data-[state=open]:animate-contentShow dark:bg-black-900 fixed top-1/2 left-1/2 flex max-h-[85vh] w-112.5 -translate-x-1/2 -translate-y-1/2 flex-col gap-7.5 rounded-[10px] p-7.5 focus:outline-none lg:w-130 lg:rounded-2xl">
          <p className="p1-medium">
            {isDeleteDialog
              ? 'Are you sure you want to delete this group?'
              : 'Are you sure you want to leave from this group?'}
          </p>
          <div className="flex gap-2.5">
            <Button variant="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="warning"
              onClick={isDeleteDialog ? handleDeleteGroup : handleLeaveGroup}
            >
              {isDeleteDialog ? 'Delete Group' : 'Leave Group'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GroupLeaveOrDeleteDialog;
