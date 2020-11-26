import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/SearchBar';
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Row } from 'reactstrap';
import PriceFormat from '../../components/PriceFormat';
import { getItemById } from '../../client/items'
import { getCategoryById } from '../../client/categories' 

const parseCondition = (condition) => {
    return condition === 'new' ? "Nuevo" : "Usado"
}

const Detail = ({ picture, description, condition, sold_quantity, title, price }) => {
    return (
        <div className="item-detail">
            <Row>
                <Col sm={8}>
                    <div className="image">
                        <img src={picture}/>
                    </div>
                    <div className="description">
                        <h2>Descripción del producto</h2>
                        <p>{description}</p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className='info'>
                        <div className='subtitle'>
                            <span>{parseCondition(condition)} | {sold_quantity} vendidos</span>
                        </div>
                        <div className='title'>
                            <h1>{title}</h1>
                        </div>
                        <div className='price'>
                            <PriceFormat currency={price.currency} amount={price.amount}/>
                        </div>
                    </div>
                    <div className='buy'>
                        <Button>Comprar</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const ItemDetail = () => {
    const [item, setItem] = useState()
    const [category, setCategory] = useState("")
    const router = useRouter()
    const {id} = router.query
    
    useEffect(() => {
        id && getItemById(id).then(res => {
                const {item} = res.data
                setItem(item);
                // getCategory(item.category)
            })
    }, [id])

    useEffect(() => {
        item && item.category_id && getCategoryById(item.category_id).then(res => {
            setCategory(res.data)
        })
    }, [item])

    if(!item) {
        return null
    }

    return <>
        <SearchBar />
        <Container>
        <Breadcrumb>
            <BreadcrumbItem active>{category}</BreadcrumbItem>
        </Breadcrumb>
            <Detail {...item} />
        </Container>
    </>
}

export default ItemDetail;