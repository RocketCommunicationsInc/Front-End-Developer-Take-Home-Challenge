import data from '../data.json'
import { Header } from "./Header";
import Table from "./Table";

export const CommandCenter = () => {

    /* 
        WARNING: THIS CODE OF PIECE MUTATES THE ORIGINAL DATA.
        Calls a function for each row in rows, "detect" undeclared array in alerts, and then add the empty detail onto the undeclared array  
    */
    data.forEach((row) => {
        if (typeof row.alerts[0] === 'undefined') {
            row.alerts.push({
                "errorId": "",
                "errorSeverity": "off",
                "errorCategory": "",
                "errorMessage": "No alert",
                "longMessage": "",
                "errorTime": "",
                "selected": false,
                "new": false,
                "expanded": false
            })
        }
    });

    /* The alerts to be sorted by error time with the most recent at the top */
    data.sort((a, b) => (a.alerts[0].errorTime < b.alerts[0].errorTime ? 1 : -1));

    return (
        <>
            <Header />
            <Table data={data} />
        </>
    )
}