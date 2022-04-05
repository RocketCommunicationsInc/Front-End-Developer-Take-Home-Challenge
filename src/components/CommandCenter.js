import data from '../data.json'
import { Header } from "./Header";
import Table from "./Table";

export const CommandCenter = () => {
    const deepClone = JSON.parse(JSON.stringify(data));

    deepClone.forEach((row) => {
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
    deepClone.sort((a, b) => (a.alerts[0].errorTime < b.alerts[0].errorTime ? 1 : -1));

    return (
        <>
            <Header />
            <Table data={deepClone} />
        </>
    )
}