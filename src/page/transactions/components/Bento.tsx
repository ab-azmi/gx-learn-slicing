import useTransaction from "../hooks/useTransaction";
import { useEffect } from "react";

const Bento = () => {
    const {
        summary,
        handleFetchTransactionSummary
    } = useTransaction();

    useEffect(() => {
        handleFetchTransactionSummary();
    }, [])


    return (
        <div className="d-flex gap-3 w-100 mb-3 flex-wrap flex-md-nowrap">

            {!summary ? (
                <>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="w-100 card-secondary">
                            <div className="bg-muted rounded-2 w-20" style={{ height: '10px' }}></div>
                            <div className="bg-muted rounded-2 w-100 mt-4" style={{ height: '8px' }}></div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <div className="w-100 card-secondary">
                        <h3 className="fw-bold">{summary?.transactionToday}</h3>
                        <h6>
                            Transaction Today
                        </h6>
                    </div>
                    <div className="w-100 card-secondary">
                        <h3 className="fw-bold">{summary?.transactionThisMonth}</h3>
                        <h6>
                            Transaction This Month
                        </h6>
                    </div>
                    <div className="w-100 card-secondary">
                        <h3 className="fw-bold">{summary?.cakeSoldToday}</h3>
                        <h6>
                            Cake Sold Today
                        </h6>
                    </div>
                    <div className="w-100 card-secondary">
                        <h3 className="fw-bold">{summary?.cakeSoldThisMonth}</h3>
                        <h6>
                            Cake Sold This Month
                        </h6>
                    </div>
                </>
            )}

        </div>
    )
}

export default Bento