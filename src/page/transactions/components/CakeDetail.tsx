import Button from "@/components/Button";
import transactionPath from "@/path/transaction.path";
import { Cake } from "@/types/cake.type";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CakePlaceholder from "@/assets/images/cake1.jpg";
import priceFormater from "@/helpers/priceFormater.helper";
import { getCake } from "@/service/api/cake.api";
import useFormTransaction from "../hooks/useFormTransaction";
import { ArrowLeft2 } from "iconsax-react";
import OrderStore from "@/store/OrderStore";

const CakeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [cake, setCake] = useState<Cake>();
    const {cakes} = OrderStore();
    const { handleOrderChange } = useFormTransaction();

    useEffect(() => {
        getCake(parseInt(id || "0")).then((res) => {
            setCake(res.result);
        });
    }, [id]);


    return (
        <>
            <div className="mb-3 mt-2 hstack gap-3">
                <Link to={transactionPath.cashier}>
                    <Button>
                        <ArrowLeft2 size={18} />
                    </Button>
                </Link>

                <h4 className="no-spacing text-muted">{cake?.name}</h4>
            </div>

            <div className="row mt-2">
                {cake?.variants?.map((variant) => (
                    <div key={variant.id} className="col-md-6 col-12 col-lg-4 mb-4">
                        <div
                            className="card-secondary h-100 cursor-pointer position-relative"
                            onClick={() => {
                                if (cake.stockSell > 0) {
                                    handleOrderChange(variant, 1);
                                }
                            }}
                        >
                            <span className="badge bg-primary position-absolute top-0 start-0">
                                Stock : {cakes.find((c) => c.id === cake.id)?.stockSell}
                            </span>
                            <img
                                src={CakePlaceholder}
                                alt={variant.name}
                                className="card-secondary-img-top"
                            />
                            <div className="mt-3">
                                <h4>{variant.name}</h4>
                                <p className="no-spacing">
                                    + {priceFormater(variant?.price)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CakeDetail