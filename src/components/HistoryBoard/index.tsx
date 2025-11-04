import { Package, Trash } from "lucide-react";

import { useTimerSettingsStore } from "@/store/timerSettingsStore";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyContent,
} from "@/components/ui/empty"

const HistoryBoard = () => {
    const { history, clearHistory } = useTimerSettingsStore();

    return <div className="flex flex-col gap-4 min-h-24 sm:min-h-64">
        <div className="flex flex-col gap-2">
            {history.length ? <div className="text-left">
                {history?.map((s) => (
                    <div key={s.id} className="flex justify-between items-center mb-1">
                        <div className="font-bold">{s.taskName}</div>
                        <div className="flex flex-row gap-1 text-gray-400">
                            <span>{s.duration}s</span>
                        </div>
                    </div>
                ))}
            </div> : <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Package />
                    </EmptyMedia>
                    <EmptyTitle>No History Yet</EmptyTitle>
                    <EmptyContent>
                        You haven&apos;t started any pomodoro yet. Get started by starting your first pomodoro.
                    </EmptyContent>
                </EmptyHeader>
            </Empty>}
        </div>
        <div className="flex justify-end">{!!history.length && <Button variant="destructive" onClick={clearHistory}><Trash /> <span className="hidden sm:inline">Reset History</span></Button>}</div>
    </div>
}

export default HistoryBoard;