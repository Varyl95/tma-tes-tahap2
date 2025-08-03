'use client'
import { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import { logout } from 'lib/auth';

import useMounted from 'hooks/useMounted';


const Home = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const hasMounted = useMounted();

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch('/api/check-session');
            if (res.status !== 200) {
                window.location.href = '/authentication/sign-in';
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products', {
                    credentials: 'include',
                });
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };

        checkAuth();
        fetchProducts();
    }, [hasMounted]);

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">

                <Row className="mt-5">
                    <Col xs={12}>
                        <h4>Products Table</h4>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Brand</th>
                                    <th>Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod) => (
                                    <tr key={prod.product_id}>
                                        <td>{prod.product_id}</td>
                                        <td>{prod.product_name}</td>
                                        <td>{prod.product_brand}</td>
                                        <td>{prod.product_owner || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <button onClick={() => { logout() }}>Logout</button>

            </Container>
        </Fragment>
    );
};

export default Home;
