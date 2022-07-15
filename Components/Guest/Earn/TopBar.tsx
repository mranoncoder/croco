import InfoBox from "./InfoBox";
import ConnectWalletButton from "../Global/ConnectWalletButton";
import UniswapMarketButton from "../Global/UniswapMarketButton";
import { useTx } from "state/transactions/hooks";

export default function TopBar(props) {
    const transaction = useTx()
    const transactionLink = 'https://rinkeby.etherscan.io/tx/' + transaction.address
    return <div className="row">
        <div className="col-lg-7">
            <div className="row">
                <div className="col-lg-5 col-sm-6 mb-3 mb-lg-0">
                    <InfoBox>
                        <div>
                            {/* <label>
                                Earned {props.earned} So Far
                            </label> */}
                        </div>
                        <div>
                            <span>
                              Number Of Stakes:
                            </span>
                            <label>{props.stakes}</label>
                        </div>
                    </InfoBox>
                </div>
                <div className="col-lg-7 col-sm-6 mb-3 mb-lg-0">
                    <InfoBox>
                        <div>
                            <span>
                              Number Of Coins:
                            </span>
                            <label>{props.totalCoins}</label>
                        </div>
                        <div>
                            <span>
                              Number Of Coins Given To Users:
                            </span>
                            <label>{props.userCoins}</label>
                        </div>
                    </InfoBox>
                </div>
            </div>
        </div>
        <div className="col-lg-5">
            <div className="row">
                <div className="col-lg-6 col-sm-6 mb-3 mb-lg-0">
                    {/* <InfoBox>
                        <div>
                    <span>
                      Market Cap:
                    </span>
                        </div>
                        <div>
                            <label>
                                <i className="fa fa-dollar-sign"/>
                                { ' ' }
                                {props.marketCap}
                            </label>
                        </div>
                    </InfoBox> */}
                </div>
                <div className="col-lg-6 col-sm-6 mb-3 mb-lg-0 d-flex flex-column justify-content-between">
                    <ConnectWalletButton className="mb-2" />
                    {/* <UniswapMarketButton href="https://uniswap.org/ecosystem" /> */}
                    {transaction.address != '' ? <UniswapMarketButton href={transactionLink}/> : ''}
                </div>
            </div>
        </div>
    </div>

}