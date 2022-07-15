import styles from 'styles/Components/Guest/Earn/Partials/InfoItem.module.scss'

export default function InfoItem(props: {title: string, value: number|string}) {
    return <div className="row mb-4">
        <div className="col-lg-4 col-md-5 col-sm-7">
            <label className={styles.Title}>{props.title}:</label>
        </div>
        <div className="col-lg-8 col-md-7 col-sm-5">
            <label>{props.value}</label>
        </div>
    </div>
}