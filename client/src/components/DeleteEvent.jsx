import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEventStore } from "@/store/useEventStore";
import { Loader2 } from "lucide-react";

const DeleteEvent = ({deleteEvent, setDeleteEvent}) => {
    const { removeEvent, eventLoading } = useEventStore();

    const handleDelete = async () => {
        const res = await removeEvent(deleteEvent._id);
        if (res?.success) {
            setDeleteEvent(null);
        }
    }
  return (
    <>
      <AlertDialog open={deleteEvent}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteEvent(null)} disabled={eventLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={eventLoading}>{
                eventLoading ? <Loader2 className="animate-spin" /> : "Delete"
                }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteEvent;
