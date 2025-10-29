import { Button } from './ui/button'

function Navbar() {
    return (
        <div className='bg-neutral-950 text-white'>
            <div className='flex justify-between px-4 py-2 bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] rotate-180'>
                <div className='flex items-center rotate-180'>
                    <Button className='login'>Login</Button>
                </div>
                <div className='flex items-center rotate-180'>
                    <img className='max-w-[60px] p-2 rounded-2xl' src="/movie-db.png" alt="Logo" />
                    <span>The Movie DB</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
