import { useForm } from "@tanstack/react-form"

import { AlarmClockCheck, Settings, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { useTimerSettingsStore } from "@/store/timerSettingsStore";
import { useTheme } from "@/components/theme-provider"
import { DEFAULT_LONG_BREAK_INTERVAL, DEFAULT_TIMES_IN_SECONDS, MODES } from "@/utils/constants";


function Header() {
    const { theme, setTheme } = useTheme();

    const setSettings = useTimerSettingsStore((state) => state.setSettings);
    // const { focusTime, shortBreakTime, longBreakTime,autoBreak, autoFocus, longBreakInterval } = useTimerSettingsStore((state) => state.getTimerSettings)();
    
    const focusTime = useTimerSettingsStore((state) => state.focusTime);
    const shortBreakTime = useTimerSettingsStore((state) => state.shortBreakTime);
    const longBreakTime = useTimerSettingsStore((state) => state.longBreakTime);
    const autoBreak = useTimerSettingsStore((state) => state.autoBreak);
    const autoFocus = useTimerSettingsStore((state) => state.autoFocus);
    const longBreakInterval = useTimerSettingsStore((state) => state.longBreakInterval);
    
    const form = useForm({
        defaultValues: {
            focusTime: (focusTime ?? DEFAULT_TIMES_IN_SECONDS[MODES.FOCUS]) / 60,
            shortBreakTime: (shortBreakTime ?? DEFAULT_TIMES_IN_SECONDS[MODES.SHORT_BREAK]) / 60,
            longBreakTime: (longBreakTime ?? DEFAULT_TIMES_IN_SECONDS[MODES.LONG_BREAK]) / 60,
            autoBreak: autoBreak ?? false,
            autoFocus: autoFocus ?? false,
            longBreakInterval: longBreakInterval ?? DEFAULT_LONG_BREAK_INTERVAL,
        },
        onSubmit: async ({ value }) => {
            const updates = {
                focusTime: Number(value.focusTime) * 60,
                shortBreakTime: Number(value.shortBreakTime) * 60,
                longBreakTime: Number(value.longBreakTime) * 60,
                autoBreak: value.autoBreak,
                autoFocus: value.autoFocus,
                longBreakInterval: Number(value.longBreakInterval),
            };

            // Call the batch update action
            setSettings(updates);
            console.log("Saving new settings:", updates);
            console.log('Settings updated successfully!');
        },
    });

    const handleDismiss = () => {
        form.reset();
    }

    const handleChangeTheme = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center"><AlarmClockCheck /><span className="font-bold text-xl">Pomodoro</span></div>
            <div className="flex gap-2 justify-center items-center">
                <Dialog>
                    <form id="setting-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full"><Settings /></Button>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="uppercase font-bold">Setting</DialogTitle>
                                <DialogDescription>
                                    Update Timer Setting
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Label>Time (minutes)</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    <form.Field
                                        name="focusTime"
                                        children={(field) => {
                                            return (
                                                <Field>
                                                    <div className="grid gap-3">
                                                        <FieldLabel className="font-light" htmlFor={field.name}>Focus</FieldLabel>
                                                        <Input id={field.name}
                                                            name={field.name}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e: any) => field.handleChange(e.target.value)}
                                                            type="number" step={1} min={0} />
                                                    </div>
                                                </Field>)
                                        }} />

                                    <form.Field
                                        name="shortBreakTime"
                                        children={(field) => {
                                            return (
                                                <Field>
                                                    <div className="grid gap-3">
                                                        <FieldLabel className="font-light" htmlFor={field.name}>Short Break</FieldLabel>
                                                        <Input id={field.name}
                                                            name={field.name}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e: any) => field.handleChange(e.target.value)}
                                                            type="number" step={1} min={0} />
                                                    </div>
                                                </Field>)
                                        }} />
                                    <form.Field
                                        name="longBreakTime"
                                        children={(field) => {
                                            return (
                                                <Field>
                                                    <div className="grid gap-3">
                                                        <FieldLabel className="font-light" htmlFor={field.name}>Short Break</FieldLabel>
                                                        <Input id={field.name}
                                                            name={field.name}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e: any) => field.handleChange(e.target.value)}
                                                            type="number" step={1} min={0} />
                                                    </div>
                                                </Field>)
                                        }} />
                                </div>

                                <form.Field
                                    name="autoBreak"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="flex justify-between items-center">
                                                    <FieldLabel htmlFor={field.name}>Auto Start Breaks</FieldLabel>
                                                    <Switch
                                                        id={field.name}
                                                        name={field.name}
                                                        checked={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onCheckedChange={(checked) => field.handleChange(checked)} />
                                                </div>
                                            </Field>)
                                    }} />

                                <form.Field
                                    name="autoFocus"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="flex justify-between items-center">
                                                    <FieldLabel htmlFor={field.name}>Auto Start Focus</FieldLabel>
                                                    <Switch
                                                        id={field.name}
                                                        name={field.name}
                                                        checked={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onCheckedChange={(checked) => field.handleChange(checked)} />
                                                </div>
                                            </Field>)
                                    }} />

                                <form.Field
                                    name="longBreakInterval"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <div className="flex justify-between items-center">
                                                    <FieldLabel htmlFor={field.name}>Long Break interval</FieldLabel>
                                                    <Input id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e: any) => field.handleChange(e.target.value)}
                                                        className="w-24" type="number" step={1} min={1} />
                                                </div>
                                            </Field>)
                                    }} />
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="default" onClick={handleDismiss}>Cancel</Button>
                                </DialogClose>
                                <Button variant="default" form="setting-form" type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
                <Button variant="outline" size="icon" className="rounded-full" onClick={handleChangeTheme}>{theme === "dark" ? <Sun /> : <Moon />}</Button>

            </div>
        </div>
    )
}

export default Header
