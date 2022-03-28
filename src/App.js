import Log from './AlertLog/Log'
import Header from './Header/Header'
import './App.css'

function App() {
    return (
        <div className="App">
            <Header />
            {/* <AlertContainer/> */}
            <div className="log-wrapper">
                <Log />
            </div>
        </div>
    )
}

export default App
