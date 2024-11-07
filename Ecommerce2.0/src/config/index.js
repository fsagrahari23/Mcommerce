
import { Tag, DollarSign, Package, Image, Percent, AlignLeft, List,Store } from "lucide-react";
export const registerFormControls = [
  {
    name:'username',
    label:'Username',
    type:'text',
    componentType:'input',
    placeholder:'Enter your username'
  },
  {
    name:'email',
    label:'Email',
    type:'email',
    componentType:'input',
    placeholder:'Enter your email'
  },
  {
    name:'password',
    label:'Password',
    type:'password',
    componentType:'input',
    placeholder:'Enter your password'
  }
]
export const loginFormControls = [
  
  {
    name:'email',
    label:'Email',
    type:'email',
    componentType:'input',
    placeholder:'Enter your email'
  },
  {
    name:'password',
    label:'Password',
    type:'password',
    componentType:'input',
    placeholder:'Enter your password'
  }
]


export const productFormControls = [
  {
    name: 'name',
    label: 'Product Name',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter the product name',
    icon: Tag
  }
  ,
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    componentType: 'textarea',
    placeholder: 'Enter a product description',
    icon: AlignLeft
  },
  
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    componentType: 'select',
    options: ['Mens', 'Ladies', 'Kids', 'Accessories'],
    placeholder: 'Select a category',
    icon: List
  }
  ,{
    name: 'brand',
    label: 'Brand',
    type: 'select',
    componentType: 'select',
    options: ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara', 'Van Heusen', 'Campus'],
    placeholder: 'Select a brand',
    icon: Store
  },
  {
    name: 'salePrice',
    label: 'Sale Price',
    type: 'number',
    componentType: 'input',
    placeholder: 'Enter the sale price',
    icon: DollarSign
  },
  {
    name: 'discountPrice',
    label: 'Discount Price',
    type: 'number',
    componentType: 'input',
    placeholder: 'Enter the discount price',
    icon: Percent
  },
  {
    name: 'totalStock',
    label: 'Total Stock',
    type: 'number',
    componentType: 'input',
    placeholder: 'Enter the total stock',
    icon: Package
  }
  
];

export const shopingViewHeaderMenuItems=[
  {
    id:'home',
    label:'Home',
    path:'/shop/home',
  },
  {
    id:'products',
    label:'Products',
    path:'/shop/listedItem',
    

  },
  {
    id:'men',
    label:'Men',
    path:'/shop/listedItem',
  },
  {
    id:'women',
    label:'Women',
    path:'/shop/listedItem',
  },
  {
    id:'kids',
    label:'Kids',
    path:'/shop/listedItem',
  },
  {
    id:'accesories',
    label:'Accesories',
    path:'/shop/listedItem',
  },
  {
    id:'footwear',
    label:'Footwear',
    path:'/shop/listedItem',
  },
  {
    id:'search',
    label:'Search',
    path:'/shop/search',
  },
]

export const filterOptions={
  category:[
    {id:"men",label:"Men"},
    {id:"women",label:"Women"},
    {id:"kids",label:"Kids"},
    {id:"accesories",label:"Accesories"},
    {id:"footwear",label:"Footwear"},
  ],
  brand:[
    {id:"nike",label:"Nike"},
    {id:"adidas",label:"Adidas"},
    {id:"puma",label:"Puma"},
    {id:"levi's",label:"Levi's"},
    {id:"zara",label:"Zara"},
    {id:"van heusen",label:"Van Heusen"},
    {id:"campus",label:"Campus"},
  ]
}
export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};


export const sortOptions=[
  {id:"atoz",label:"A to Z"},
  {id:"ztoa",label:"Z to A"},
  {id:"asc",label:"Price: Low to High"},
  {id:"desc",label:"Price: High to Low"},
]



export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    label: "Zipcode",
    name: "zipcode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];