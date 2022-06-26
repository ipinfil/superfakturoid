import { Button, Pane, SelectField, Text, TextInputField } from "evergreen-ui";
import { useState } from "react";

const InvoiceForm = (props) => {
    // state
    const [isHoursInvalid, setIsHoursInvalid] = useState(false);
    const [isCostInvalid, setIsCostInvalid] = useState(false);
    const [isCompanyIDInvalid, setIsCompanyIDInvalid] = useState(false);
    const [hours, setHours] = useState(160);
    const [cost, setCost] = useState(localStorage.getItem('cost') ?? process.env.REACT_APP_COST_PER_HOUR);
    const [sum, setSum] = useState(hours * cost);
    const [companyId, setCompanyId] = useState(localStorage.getItem('company_id') ?? process.env.REACT_APP_COMPANY_ID);

    // months
    const months = [
        {name: 'Január', value: 1},
        {name: 'Február', value: 2},
        {name: 'Marec', value: 3},
        {name: 'Apríl', value: 4},
        {name: 'Máj', value: 5},
        {name: 'Jún', value: 6},
        {name: 'Júl', value: 7},
        {name: 'August', value: 8},
        {name: 'September', value: 9},
        {name: 'Október', value: 10},
        {name: 'November', value: 11},
        {name: 'December', value: 12},
    ];

    let lastMonthNum = new Date();
    const actualMonthNum = lastMonthNum.getMonth();
    lastMonthNum.setMonth(actualMonthNum === 0 ? 11 : actualMonthNum - 1);
    lastMonthNum = lastMonthNum.getMonth() + 1; // + 1 so that it is actual month number indexed from 1
    const [month, setMonth] = useState(lastMonthNum);

    const setSumRounded = (value) => {
        setSum(value.toFixed(2));
    }

    // event handlers
    const handleHoursChange = (event) => {
        setHours(event.target.value);
        setSumRounded(cost * event.target.value);
    };

    const handleCostChange = (event) => {
        setCost(event.target.value);
        setSumRounded(hours * event.target.value);
    };

    const handleCompanyIdChange = (event) => {
        setCompanyId(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    }

    const handleSubmit = (event) => {

    };

    return (
        <Pane padding="20px" width="50%" minWidth="250px" alignItems="center" elevation={1} backgroundColor="white" borderRadius="5px">
            <form>
                <Pane display="flex" columnGap="15px">
                    <TextInputField
                        isInvalid={isHoursInvalid}
                        validationMessage={isHoursInvalid ? "Počet hodín je potrebný údaj." : null}
                        name="hours"
                        label="Počet hodín"
                        type="number"
                        onChange={handleHoursChange}
                        value={hours}
                        min="0"
                        step="0.01"
                        flex="1"
                    />
                    <TextInputField
                        isInvalid={isCostInvalid}
                        validationMessage={isCostInvalid ? "Cena za hodinu je potrebný údaj." : null}
                        name="cost"
                        label="Cena za hodinu"
                        type="number"
                        value={cost}
                        min="0"
                        step="0.01"
                        onChange={handleCostChange}
                        flex="1"
                    />
                </Pane>
                <Pane display="flex" columnGap="15px">
                    <SelectField
                        name="month"
                        label="Mesiac"
                        flex="1"
                        value={month}
                        onChange={handleMonthChange}
                    >
                        {months.map((month) => {
                            return (
                                <option key={month.value} value={month.value}>{month.name}</option>
                            )
                        })}
                    </SelectField>
                    <TextInputField
                        isInvalid={isCompanyIDInvalid}
                        validationMessage={isCompanyIDInvalid ? "IČO firmy je potrebný údaj." : null}
                        name="company_id"
                        label="IČO firmy"
                        value={companyId}
                        onChange={handleCompanyIdChange}
                        flex="1"
                    />
                </Pane>
                <Pane display="flex" columnGap="15px" alignItems="center">
                    <Button flex="1" appearance="primary" intent="success" fontWeight="bold" padding="0">Vytvoriť faktúru</Button>
                    <Text flex="1" size={500} textAlign="right">{sum} €</Text>
                </Pane>
            </form>
        </Pane>
    )
};

export default InvoiceForm;