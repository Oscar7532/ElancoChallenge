function ReportForm() {
    return (
        <>
        <h2>
            Reporting Form
        </h2>


        <form>
            <label htmlFor="Species">Species:</label><br/>
            <input type="text" id="Species" name="Species"/><br/>
            <label htmlFor="LatinName">Latin Name:</label><br/>
            <input type="text" id="LatinNam" name="LatinNam"/><br/>
            <label htmlFor="Location">Location:</label><br/>
            <input type="text" id="Location" name="Location"/><br/>
            <label htmlFor="DateTime">Date/Time:</label><br/>
            <input type="text" id="DateTime" name="DateTime"/><br/>
            <input type="Submit" value="submit"/><br/>
        </form>
        </>
)
}

export default ReportForm