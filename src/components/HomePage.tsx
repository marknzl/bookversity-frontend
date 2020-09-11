import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IHomePageItems from '../shared/IHomePageItems';

function HomePage() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState<IHomePageItems>({
        loading: true,
        data: null,
        error: false
    });

    const fetchItems = async () => {
        const fItems = await fetch(
            "https://bookversity-backend.azurewebsites.net/Item/Latest10"
        );

        const allItems = await fItems.json();
        setItems({
            loading: false,
            data: allItems,
            error: false
        });
    }

    if (items.loading) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <p>Loading items..</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) 
    } else {
        return (
            <div>
                Loaded!
            </div>
        )
    }
}

export default HomePage;