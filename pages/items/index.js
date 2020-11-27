import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/SearchBar';
import { Breadcrumb, BreadcrumbItem, Container, Row, Alert } from "reactstrap";
import SearchResults from '../../components/SearchResults';
import { searchWithText } from '../../client/items';

const SearchIndex = () => {
    const router = useRouter()
    const { search } = router.query
    const [results, setResults] = useState();
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState();

    useEffect(() => {
        search && searchWithText(search)
            .then(res => {
                const { items, categories } = res.data
                setCategory(categories[0]);
                setResults(items)
            })
            .catch(err => {
                setErrors(err.response.data)
            })
    }, [search])

    return <>
            <SearchBar text={search}/>
            <Container>
            {errors ? 
                <Alert color="danger">
                    {errors}
                </Alert> :
                <>
                    <Breadcrumb>
                        <BreadcrumbItem active>{category}</BreadcrumbItem>
                    </Breadcrumb>
                    <Row className="search-results">
                        <SearchResults handleSelect={(c) => setCategory(c)} items={results} />
                    </Row>
                </>}
            </Container>
        </>
}

export default SearchIndex