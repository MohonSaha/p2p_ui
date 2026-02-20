import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Clock } from "lucide-react";
import LiveTimeTracker from "./LiveTimeTracker";
import ManualTimeEntry from "./ManualTimeEntry";

interface TimeTrackerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TimeTrackerDialog = ({
  isOpen,
  onOpenChange,
}: TimeTrackerDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Tracker
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-0">
            <LiveTimeTracker onClose={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="manual" className="mt-0">
            <ManualTimeEntry onClose={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TimeTrackerDialog;
