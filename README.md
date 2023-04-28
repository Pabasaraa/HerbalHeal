# HerbalHeal
### (Ayurvedic/Herbal Medicines and Supplements Online Store)

3rd Year 2nd Semester Distributed System Module's Group Project.
This is an online store where users can buy and sell Ayurvedic/Herbal medicines and supplements. The website has three stakeholders - buyers, sellers, and administrators.
- Sellers can add, update, and delete items, while buyers can search and buy items, as well as maintain a cart system. Once an item is purchased, an administrator may manually verify the order and confirm it. Buyers can select the delivery option and track the status of their order.

## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, Node.js)
- Redux
- Docker
- Kubernetes

## Features

- User authentication and authorization
- Item search and filtering
- Cart system
- Order verification and confirmation by administrators
- Delivery option selection and tracking
- Payment services (dummy)
- SMS and email confirmation for payment
- Review system for sellers and products

## Getting Started

#### .env file structure for backend
> These are working credentials for testing purposes.
```
MONGO_URI = 'mongodb+srv://admin:admin@herbalheal.zwmnuap.mongodb.net/?retryWrites=true&w=majority'
PORT = 8000
JWT_SECRET_KEY = bb2aa35424e917e585d02fe547e654a226cc092ffaed145b3d1ea5ccee395476
CRYPTOJS_SECRET_KEY = EB7F0D431C9A8B52D60A1C7FF347EBA9802CC77300A36796389C2D528C844D06
```

### Instructions for run app natively (without docker)

1. Clone the repository: `git clone https://github.com/Pabasaraa/HerbalHeal.git`
2. Navigate to the backend folder: `cd HerbalHeal/backend`
3. Create .env file in the root of the backend
4. Copy above test credentials into the .env file
5. Install dependencies: `npm install`
6. Start the server: `npm start`
7. Navigate to the frontend folder: `cd ../frontend`
8. Install dependencies: `npm install`
9. Start the frontend: `npm start`
10. Open the browser and navigate to [http://localhost:3000/](http://localhost:3000/) 

Note: You need to have both the backend and frontend running simultaneously for the website to work properly

### Instructions for run app in docker (with docker)

1. Clone the repository: `git clone https://github.com/Pabasaraa/HerbalHeal.git`
2. Navigate to the project folder: `cd HerbalHeal`
3. Run `docker-compose up --build`
4. Open the browser and navigate to [http://localhost:3000/](http://localhost:3000/) 

Note: You need to have Docker installed on your PC

## Contributors

- Withana W.A.S.P - IT20664312 (Pabasaraa)
- Navodi P.T - IT20639662 (IT20639662)
- Kulasekara D.C.V - IT20638368 (chavikulasekara)
