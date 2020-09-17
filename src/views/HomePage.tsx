import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomePageItemCard from '../components/HomePageView/HomePageItemCard';

import AuthService from '../services/AuthService';
import IHomePageResponse from '../types/Response Types/IHomePageResponse';
import ItemService from '../services/ItemService';
import IHomePageProps from '../types/Props/IHomePageProps';
import FilterBox from '../components/HomePageView/FilterBox';
import ItemsForSale from '../components/HomePageView/ItemsForSale';

function HomePage(props: IHomePageProps) {
    const [searchTerm, setSearchTerm] = useState<string | null>("");
    //const [facultyFilters, setFacultyFilters] = useState<string[]>([]);

    props.hubConnection?.on("refresh", () => {
        fetchItems();
    });
    
    useEffect(() => {
        if (searchTerm === "") { 
            fetchItems();
        } else {
            searchItems();
        }
    }, [searchTerm]);

    const [homePageResponse, setHomePageResponse] = useState<IHomePageResponse>({
        loading: true,
        items: null,
        error: false
    });

    const fetchItems = async () => {
        // const fItems = await fetch(
        //     "https://bookversity-backend.azurewebsites.net/api/Item/Latest10"
        // );

        const fItems = await ItemService.latest();

        setHomePageResponse({
            loading: false,
            items: await fItems.json(),
            error: false
        })
    }

    const searchItems = async () => {
        const sItems = await ItemService.searchItems(searchTerm);

        setHomePageResponse({
            loading: false,
            items: await sItems.json(),
            error: false
        });
    };

    const updateFunc = () => {
        props.hubConnection?.invoke("refresh");
        fetchItems();
    };

    // const onFacultyClick = (e: any) => {
    //     e.preventDefault();
    //     let faculty = e.currentTarget.getAttribute("href")
    //     let newFaculties = facultyFilters;

    //     newFaculties.push(faculty)
    //     setFacultyFilters(facultyFilters);
    //     console.log(facultyFilters);
    // }

    const handleSearchTermChange = (s: string | null) => {
        setSearchTerm(s);
    };

    var Items: JSX.Element[] = [];

    if (homePageResponse.items != null) {
        for (let i = 0; i < homePageResponse.items.length; i++) {
            if (homePageResponse.items === null) {
                return (
                    <div>

                    </div>
                )
            }

            let item = homePageResponse?.items[i];

            if (AuthService.isLoggedIn()) {
                if (AuthService.getUserId() !== item.sellerId) {
                    Items.push(
                        <HomePageItemCard key={item.id} item={item} updateFunc={updateFunc}></HomePageItemCard>
                    )
                }
            } else {
                Items.push(
                    <HomePageItemCard key={item.id} item={item} updateFunc={updateFunc}></HomePageItemCard>
                )
            }
        }
    }

    if (homePageResponse.loading) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="mt-4">
                            <h4>Loading items..</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) 
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    {/* Filter box takes 3 columns */}
                    <FilterBox handleSearchFunc={handleSearchTermChange}/>

                    {/* Items for sale takes up 9 columns */}
                    <ItemsForSale items={Items} />
                </div>
            </div>
        )
    }
}

export default HomePage;