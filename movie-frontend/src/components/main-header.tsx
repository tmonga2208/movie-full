import { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import MovieComp from './movie-form'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

function MainHeader() {
    const [checked, setChecked] = useState(false);

    // ✅ Initialize safely after mount (avoids "localStorage not defined" issues)
    useEffect(() => {
        const stored = localStorage.getItem('tableMode') === 'true';
        setChecked(stored);
    }, []);

    const handleTableMode = (newChecked: boolean) => {
        setChecked(newChecked);
        localStorage.setItem('tableMode', newChecked.toString());
        window.dispatchEvent(new Event('tableModeChanged')); // ✅ triggers update in other components
    };

    // Optional: sync if other tabs or components change it
    useEffect(() => {
        const update = () => {
            const stored = localStorage.getItem('tableMode') === 'true';
            setChecked(stored);
        };
        window.addEventListener('tableModeChanged', update);
        window.addEventListener('storage', update); // also syncs across tabs
        return () => {
            window.removeEventListener('tableModeChanged', update);
            window.removeEventListener('storage', update);
        };
    }, []);

    return (
        <header className='flex justify-between px-4 py-2 items-center'>
            <div className='flex items-center'>
                <img
                    className='max-w-[60px] p-2 rounded-2xl'
                    src="/movie-db.png"
                    alt="Logo"
                />
                <span className='ml-2 font-semibold text-lg'>The Movie DB</span>
            </div>

            <div className='flex items-center gap-4'>
                <div className='flex gap-3 items-center'>
                    <Switch
                        id="table-mode"
                        checked={checked}
                        onCheckedChange={handleTableMode}
                    />
                    <Label htmlFor="table-mode">Table Mode</Label>
                </div>

                <ModeToggle />
                <MovieComp />
            </div>
        </header>
    );
}

export default MainHeader;