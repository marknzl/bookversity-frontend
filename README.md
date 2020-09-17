# bookversity-frontend
![Build Status](https://dev.azure.com/msa-devops/Bookversity/_apis/build/status/marknzl.bookversity-frontend?branchName=master)

Frontend for the Bookversity web application. Part of my submission for the Microsoft Student Accelerator 2020 Phase 2 project.

# Intro
Bookversity (yes, not the greatest name, pls don't roast <3) is a simple web platform I built dedicated to facilitate the selling of second-hand university textbooks. This is the frontend of the project, you can find the backend [here](https://github.com/marknzl/Bookversity-Backend). This frontend utilizes React + TypeScript providing a 'SPA' type experience with a responsive UI. This project utilizes CI/CD pipelines via Azure DevOps.

# Screenshots

## Homepage
![Homepage image](screenshots/homepage.png)

## Cart
![Cart image](screenshots/cart.png)

## Account Overview
![Account overview](screenshots/account_overview.png)

## Viewing an order
![Order viewing](screenshots/order_viewing.png)

# Frontend app architecture

## Intro 
As mentioned before, my frontend app utilizes the React framework paired with TypeScript to provide a smooth 'SPA' (Single-Page-Application) experience; no reloading is required and content is updated in real-time via WebSockets using the SignalR library

## SignalR initialization
Inside `App.tsx`, a single SignalR connection is established to my backend; and initializing this connection gives me a `HubConnection` object. This `HubConnection` object is then passed down to child components which require real-time functionality (e.g the homepage).
### Code snippet from `App.tsx`

```TypeScript
useEffect(() => {
    const createHubConnection = async () => {
        const conn = new HubConnectionBuilder().withUrl("https://bookversity-backend.azurewebsites.net/refreshHub")
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build()

        try {
            await conn.start();
            console.log("Real-time connection to server established.")
        } catch (error) {
            console.log("Couldn't establish a real-time connection to the server!");
        }

        setHubConnection(conn);
    };

    createHubConnection();
  }, []);
  ```

## Views and Components

### Views
A 'View' in my app is *still* a component. My Views are typically large components that encapsulate smaller components within. For example, the homepage view is in `HomePage.tsx` and it contains smaller child components that make up the overall view, such as the filter box component for searching. All views are stored within the `/views/` directory.

### Components
Components in my app are the building blocks of my 'Views' (previous section). They are all stored in the `/components/` directory. Inside this directory, components that make up a single view are in another directory using the convention: `{ViewName}/{Component Name}`. For example, the Filter Box component which helps make up the homepage view is stored in `HomePageView/FilterBox.tsx`.

## Services
My app makes HTTP requests regularly to various endpoints on my backend API. I've created simple 'services' which are grouped together by functionality (e.g AuthService, CartService) that I can call on easily. I felt that this approach would be a bit cleaner compared to having the API call logic residing directly within components.
### Code snippet of `login()` from `AuthService.tsx`
```typescript
function login(email: string, password: string) {
    return axios.post(AUTH_API_URL + "Login", {
        email,
        password
    });
}
```

## Types

Throughout this project, I make use of strongly-typed types via **heavy** use of interfaces. My interface naming convention is `I{interface-name}.ts` (e.g, `IOrder.ts`).

### Response types
My 'base' response type interface looks like this:

### `IResponse.ts`:
```TypeScript
interface IResponse {
    loading: boolean,
    error: boolean
}
```

Any view/component that requires interacting with my backend API will have its own 'type' interface which extends this 'base' response interface. For example, the component which fetches cart items will get a response consisting of an array of items. So the `ICartResponse.ts` interface will extend from `IResponse.ts`, but will contain a new field for items.

### `ICartResponse.ts`
```TypeScript
interface ICartResponse extends IResponse {
    cartItems: IItem[] | null
}
```

### Prop types
Each and every component that requires props has its own interface. You can find them under `types/Props`.