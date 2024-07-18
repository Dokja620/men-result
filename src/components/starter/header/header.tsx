
import { component$ } from "@builder.io/qwik";
import ImgMen from '~/media/media/men.webp?jsx';
import ImgMada from '~/media/media/mada.webp?jsx';

export default component$(() => {
    return (
        <header>
            <nav>
                <a href="/" class="mada"><span><ImgMada alt="MADA logo" /></span></a>
                <p>&</p>
                <a href="/" class="men"><span><ImgMen alt="MEN logo" /></span></a>
            </nav>
        </header>
    );
});
