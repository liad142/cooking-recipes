import './ThemeSelector.css'
import {useTheme} from "../hooks/useTheme";
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['#7427df' , '#37cf51' , '#e02d5b']

const ThemeSelector = () => {
    const {changeColor,changeMode,mode} = useTheme();

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)

    return (
        <div className={'theme-selector'}>
            <div className="mode-toggle">
                <img src={modeIcon}
                     onClick={toggleMode}
                     alt={'dark/light toggle icon'}
                style={{filter:mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}/>
            </div>
            <div className="theme-buttons">
                {themeColors.map(color =>(
                    <div key={color} onClick={()=>changeColor(color)} style={{background:color}}/>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
