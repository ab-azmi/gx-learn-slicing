import priceFormater from "@/helpers/priceFormater.helper";
import CakePlaceholder from "@/assets/images/cake1.jpg";
import { useNavigate } from "react-router-dom";
import transactionPath from "@/path/transaction.path";
import OrderStore from "@/store/OrderStore";

const CakeMenu = () => {
    const navigate = useNavigate();
    const { cakes } = OrderStore();

    return (
        <>
            <div className="row mt-2">
                {cakes?.map((cake) => (
                    <div key={cake.id} className="col-md-6 col-12 col-lg-4 mb-4">
                        <div
                            className="card-secondary h-100 cursor-pointer position-relative"
                            onClick={() => navigate(`${transactionPath.cashierCake}/${cake.id}`)}
                        >
                            <span className="badge bg-primary position-absolute top-0 start-0">
                                Stock : {cake.stockSell}
                            </span>
                            <img
                                src={cake.images?.length ? cake.images[0].link : CakePlaceholder}
                                alt={cake.name}
                                className="card-secondary-img-top"
                            />
                            <div className="mt-3">
                                <h4>{cake.name}</h4>
                                {cake.totalDiscount !== 0 ? (
                                    <div className="hstack gap-3">
                                        <p className="text-decoration-line-through text-primary">
                                            {priceFormater(cake.sellingPrice)}
                                        </p>
                                        <p>
                                            {priceFormater(cake.sellingPrice - cake.totalDiscount)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="no-spacing">
                                        {priceFormater(cake?.sellingPrice)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CakeMenu