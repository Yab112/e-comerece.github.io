import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { ShopContext } from "@/Pages/Context/shopContext";
  import { useContext } from "react";
  import {useNavigate} from "react-router-dom";
  
  const Dialog = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
    };
    const { clearAllOrders, cardItems } = useContext(ShopContext);
  
    return ( 
          <AlertDialog>
            <AlertDialogTrigger>Clear All</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your cart
                  items and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllOrders}>
                   <div onClick={handleClick}>
                    <span>continue</span>
                   </div>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );
  };
  
  export default Dialog;
  