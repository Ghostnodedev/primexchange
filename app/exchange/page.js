/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { encryptData } from "../utils/crypo";
import Navbar from "../component/header";
import Footer from "../component/footer";
import Slider from "react-slick";

export default function ExchangePage() {
  const [seconds, setSeconds] = useState(60);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showDepositModalPage, setShowDepositModalPage] = useState(false);
  const [network, setNetwork] = useState("erc20"); // New network dropdown state
  const router = useRouter();
  const [passwordDigits, setPasswordDigits] = useState([]);
  const depositModalRef = useRef(null);

  // Check authentication token presence
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Timer countdown for rate refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for modals
  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword("");
  };

  // Password submit validation & flow
  const handlePasswordSubmit = () => {
    if (password.length !== 6 || isNaN(Number(password))) {
      toast.error("Password must be exactly 6 digits.");
      return;
    }
    localStorage.setItem("securePassword", password);
    toast.success("Password saved!");
    handleClosePasswordModal();
    setShowDepositModalPage(true);
  };

  // Deposit amount submit and redirect to Deposit page
  const handleDepositRedirect = () => {
    if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const newAmount = parseFloat(amountInput);

    const encryptedNewAmount = encryptData(newAmount.toString());
    Cookies.set("lastDepositAmount", encryptedNewAmount, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    Cookies.set("selectedNetwork", network, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    setShowDepositModalPage(false);
    toast.success(
      `$${newAmount.toFixed(
        2
      )} on ${network.toUpperCase()} saved! Redirecting to deposit page...`
    );

    router.push("/deposite");
  };

  // Prevent closing modal when clicking outside deposit modal container
  const handleDepositModalOutsideClick = (e) => {
    if (
      depositModalRef.current &&
      !depositModalRef.current.contains(e.target)
    ) {
      // Prevent modal from closing on outside click
      // Uncomment below if you want to close on outside click:
      // setShowDepositModalPage(false);
    }
  };

  const handlesell = () => {
    toast.success("Please Add an Bank account to continue");
    router.push("/mine");
  };

  if (isAuthenticated === null) return null;

  // If not logged in → show login screen
  if (!isAuthenticated) {
    return (
      <div
        className="vh-100 d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
          color: "white",
          padding: "2rem",
        }}
      >
        <div
          className="p-5 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            maxWidth: "500px",
            width: "100%",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.7)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#25D366"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 
                0-1 1v6a1 1 0 0 0 1 1h10a1 
                1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V5a4 
                4 0 0 0-4-4m3 7H5V5a3 3 0 1 1 
                6 0z"
              />
            </svg>
          </div>
          <h2 className="fw-bold mb-3">Access Restricted</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
            Please log in to unlock the Exchange and explore live crypto
            trading.
          </p>
          <Button
            variant="success"
            size="lg"
            href="/login"
            style={{
              borderRadius: "30px",
              padding: "10px 30px",
              marginTop: "1.2rem",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.6)",
            }}
          >
            🔑 Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Example rates and testimonials data
  const rates = [
    { usd: 2999, inr: 95.5 },
    { usd: 4999, inr: 96.5 },
    { usd: 9999, inr: 97.5 },
  ];

  const testimonials = [
    {
      name: "Aman Sharma",
      role: "Crypto Trader",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4CA95pgfQY_0HCrP-Ds9BQQ0EvR1IeCxTqT3Y4PnMIEpFWWzpEhvEObkBpYAzwedeotQ&usqp=CAU",
      rating: 5,
      text: "Fast, reliable, and hassle-free service. I got my INR within minutes of sending USDT.",
    },
    {
      name: "zoya Patel",
      role: "Financial Advisor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKFl13fa-nxTYt1TeHo26_utOIU2iQdwTvrA&s",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
    {
      name: "kane smith",
      role: "Trader",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUSEhMVFRUSFxUQFRUVFRUVFRUVFRUWFhUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICUtLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0rListLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EAEAQAAEDAgQCCAIIBQQBBQAAAAEAAhEDBAUSITFBUQYTIjJhcYGRobEUI0JScsHR8AcVYpLhJDNDU4JzorLC8f/EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAAmEQACAgICAgICAgMAAAAAAAAAAQIRAyESMQRBIlETcWGBBRQj/9oADAMBAAIRAxEAPwD0hRq1YkGAYUirwHNdrt7KVkQO2rTDSI5KBXrvFSBEA6KfWdFOeI2Ua2aHQeIMpX9DIlUq7ju1EL5jnKNlQKmkeBRASIXcmkpBD+kdrJpqEQD21gZbxC6q+hScKxknZWSC2FjE0ohQyiQ5K4VwpBAI5oREwJ6JDoXQuBOChBEJpCekoQE5iE+mpK4WqUQguYmEKY+mgPYkaCBhccESE0hAgJwQnhHcEF6hCO4aqba04GY7IFKlJngFDub/AKyr1LdAN0yAyypXhfU07oUHFK5c8hpIgbKztKAaNEC6tRnzeCZrQEzuAF2ocZ0VlHaUXDaUPPkpkdpRdBfYi1JOdukoQisEun0CdUEhdYICciKQbpst03XKLcmWeJhTK7RB0TbaCPJK1sZPQcVBzQyJIPDZEDRyTnCQiKco7RyQHW31od4I3iNDxXGlxO0IBHgdpPhJjITkQDCEwhFKY5QIIri6VyEAjmpwTAnhQh1PCYnBEA5cKRWd6U9ITbAMpND6zhIBnKxv3nx8BpOqjdBSb0jQylK8hvMRv6rpdcvaOTHdWPZkfGUXDsWvqJEXDnDlUPWT/dJHoQq/yxLv9eZ6yUN4VPg2PirDKgDX82zkJ9dWnwPurlye01aKmmnTIzwmFFehuSkBOQXozkB6gQ9jsVWULYC4LuJVhZHdQaNL/Uz4IoBeUgh3m58gj0woOKO7UcCJTvoRBcNrBzjHBTB3j5KvwiM5I5BWDe8fRD0H2KpuklV3KSUagS6uLqsKzqaxsJySARJ0pqcoQcEnVYQyVweaBCQx4KcozdCjtcoQRTHJ5KY5QIMri6uFAJ0JwTQnBQh1dBXFxEhy4rhjHPds0Fx8hqvN7u5617nO3ecx/Ieggei3mMszW9RvNh+Gv5Ly24vXUwS1kwYLnODR4xO6ozW9GrxqVsmPaojiRw9UrbEOtaS2DG+oj3VV9JDiTlqO1DYz5RBnUA7xGvmsyjZtlJJG66J0Otdr5LYNqEdl2448xzWS6H39MltMBzeRdl35ZgTIWlv7gCoGnR2oBOxMF2UHmGgn1HNacVJGHPcpdEhzkJxTBUTHPVjKBzig1Es649AgawbqUyiz61SMKbMo9tRBuIPKU69CkimwnWNlHxCgHQeIV7XMMMclT3GwTsUjYVaCmXGZlTGd4ptruU6n3j5oBO1dyklV3KSrGCNoBEFuEIzzXC481s4mTkK5YBsgFyI8k7poaqpIti9Ay9NLyhXdcUyNN0IXvgqrLA9Rzo0CEKtT7iab/wDpTDin9KBAzqlQx2YUinmUH+a/0rv80P3VAliCU7KYlV1jiJqPy5Y0lW92OwFAEcJJzRokoE4F1cC6mIIpjinlCegyIGe12SYnT3XkmJ4Wwy+oeJb2+1EHZjdp9F6tVXjnTO4qUK7wROR5GswTPZJ8I1VGRNtUasDSuy0sKdFgy5mtcYMEiQDxdG2qi13U5ljmVNTIDXaAbHMdHT4KNgGA3F+XPzaA5DmIpRAGmXKTEHeZU/F+idK3pkCoypXdGVjc53iSTwETxGyr/F7NX5HVIsuidRtatl7paM3lC1mLNdVvqLBJbDKkxAbuCJ4yA8+GVeWdFGuo3D25jmcGsbG0l7Sdzt2fZex3Vb6OKdQAFxZ1ZceU5oHx9k6xqq/RQ8zT5e6aJ7cIH3ik7CW/eKoqvSmtsynmPhKhXHS25b3qWUbSZhXXEyVI0b8MaNcxVXVrCSBw0U3Cb51e3L3RJnZUw3SthRocEEgqVaj/AFH/AIoOAN7J8lJtx/qB+H81Z9CfZZXfcKp7jYK4ve4VTXR0CcUfa8V2h3z5rlpxSte+fNAKCVdyklU3KSrHDOCY4IzghuC3GIGQuZUSNEoVUuy2PRm8dr5XgJ2FgVTlLg3zU/EA0EEtBUYOZ/1hZmtl16BXwFOo5gcDEa+YnVADgpRqtH/GE03Tf+tQJHJCg31y4OAGgVr9MH/WE51yD/xhSiWROj1UF4l0uM6eC1V13AqPDqoNTRgbpur267gRFADZcKcNk1ygTgXU0JyJDhQnopQnqMiI1dYH+LeEOaz6Q0Sx7QKmnde2MrvI6D08Vv6wRMRvbdjAys5hztIyHtFw2PYG4+CR17LI8r+KPD8IxE1KQLS0PHZOYTtuji/dTzF1VpLhAAAG+6pekNkxlasbQFtNlR1PITOWA0x4t1I9FU2rXEguLnRGmuo8+GyTgnuzQ8s18Wtm66H0AK/WvPZ1JB0mNBqdzK2/TTH2UqVANaapqV2UQ1hGY9h8lo49ogePNeTm+qTJMf0jYLf9BMKc54urkx1bYpNP/GD3nfjIEeAlCeSkTHhcnbNGym+2adCTmLToTpO48I1TMbxNtakKTaT53JLSPZaCjjNN4IYWy3QgnUA90+Z5eSDXxJw2Y1MmmrTKZxlF00ReitEts4cCDruq87rSWlYvolxAG+yzbt0WIjU4A3snyR6I+vH4T80zAR2D5I1P/fb+E/NW/QhMv+4VSXZ2V1f9z2VJdnZMwINZnddtO8fNNs+Kfad4+aUI+oNSkk/cpJBiW4IbkVyE5bTGxoSXQuPOirkPHopcWuA0gFQvprQ2VLxVlMkF4JUQ0aBEZDHqsrTsvVAhiLDsg/zJilMp0G7MK4wW7Z7B130USY2hUqrXEAbnZHu3ilo7eJ0XDc0PubeCVWtScZLSfNMrA6Fg9wH1NORWhuz2AqDDX0xU7DSCQru7PYCjANB0XCmtOi6UEEScmroTAEVS4hjLWSGDMROv2ZHzUjH7zq6TgNyI8lknPysHHQRyWbPlcXSOl4XiLIuc+jmOY69jJc7V2gY3SSeHisxfYo60pmo5uarW5jusBBcT5TtzIU80+tuH1Nwx3VUxwkd93vp6LmP2bajDImIZHF0doieAkCfLyWZPezrcEo1HRiaNZzbp4cdKwD2ngY19ZDlNfTmToABJjQeZKnPwPrBTbOV9KXsdA3c5wexw3iQPKeSrb6sagawNOYiSzkfHx81dd9GF4WpOy9wHC6ZY2vLXl05Y7rOGx1zA81b4hjfVsFKn2nOPDiefkNSVnsM62k0tLGsaQIa37zRBd5uG/iArS0oZWl7tz7nkFXPs14ofHqibhogh1UkgyXAGJnefZbO1xahcAMllN2jWbgaaBrjssC+oA4NIL6h1DBwHAuPAKxtQ5kHTNvAEAeHj6pYycXYc2COWNM9EsWObRcHCCJHh6HiFnXd7981d4JfVKtNzamYCAGdkkCBqS4Djy4Kpurd1N4DxE6jYyJ5hbFLkkzg5MTxycWavAh2CisH17fwn5pmCdworB9c3yKvM4bEe56hUd0dleYl3PVUN0dQiwIkWmxRLTveqFQPZR7TvIBFUOpSTap1KSqscnuQnIrkJy3oxM4NkikCkdkkux4lJirhIBOpQKTBCh9JcPqVq1JzHhoYSTPFHbSe3QFpCyu7NCqgrqQVZjFz1LMwElS6tKoSNWrO41gt5WMCowN9ZUdhVCtMcc94aW6FamkwELDW/RW8Y4O61hAM7Fa+hSqtgS3bVSNrsMqfROs6QDwrW7PYVVaBweJI9FZ3R7CLESGtOi7KGw6JZ0qCGCSa0qNiT4pPgkEtIBG4JG4TN0rDGLlJJezMdILnN1nrHkNP35qmq3MBo4Zc3oBJUq/qEgg7kHUbHSfTZU1p2zlP2WOHxA/Nc1u3Z6eEeMUkWWH0MlJs7xmP4nak+5Q7purRwHaPqf0Vpk0AVfdjM7zgfFKMQb+g6oXupvbT6sBhJPadndLsjfA6k8I9wYZhLaLc0EuOpJ7xJ4SrgsDYA3JHnz+Y+KJUaJE7DX1TctUCtkMUI1O6jX9QtLGNg1HyGA6gR3qhH3Wj3MDirImBndsNlR4Rdda6pWiXOeaNP8DQD7SSfZRfZG/RYUbZlAQJLnaucdX1HcST+wFIoB06dn8O/q5CaNSW9o7F57vk0cfTROpW4LpcS4+P5DYIBNd0doumTMeLp/NT+kltl6tw2JcPI6ED5qH0bpeCuOlOlKmOOeY8Mp/ULVgXxOL5svnRMwQfVlGaPrW+RQsE/2yjNH1g8itZzR2J9z1VBdHVX2Kdz1VBdHVF9ERIBimpFluFHq/7R8kbDTMeSARVdykn1BqUlVQ5JcShOJUhyE5dBGEYwpx2XJSnRJLssj0ZXpMyXtMqDQpabn3UzpI0ueGgwSDHms6K1a1gVAXA65hsFlb+VGiko2y4NA8z7lNNA8z7lVh6QR3m77eKO3Hqf2tFJadMMVyVrol/RzzPuUQWhjc+5XKd21wmd1LZXbG4UQGAw2gW1QZPutDd1eyqW3qguEKTd19whIkSUKuizeN9Lads/I4EndWza2i89/iY4AtdGsHX0RirJJ0WF3/EowRTYB4u/RXwvqppt652YlrXOgAZSWyRA4arzLoJhZua3WPE06JDiOD37tb5Dc+QHFb67uC2pLo7Y3O0j/HyWbyJV8UdP/H4b/wCkl+gVWoDOugHpCr8Ipj6S/kGD4u/VqDil3lHZ06yR4GELo5cjM9xPJkcdy7X+74rPWjrN+jUVH/vwVbBzz+/3qpDrkc9XfABDwyqc5fDXAEjK8S077iddx7JaJ6Ezvydcjfi6CR7Bv9yc4yddABJQKhhkzrUcI8idPgAqzFbzrHmiww1utR3jy9AilZLOYziJqU35PwN8S7QfNDwWwLdCey0ZQwDWPtF54Fx1IGsQNNlMssM7pDu8JH9APGfvH4fK0dSbTblboB7lFulQFvYx3IwOAAP6bI9rTbOp9lCa0E/4V5heE9Yd8o3lBIE5JK2aXA7VgAyufqudLQGGiwE/beZJJJloBJPqrbBrZlNoYySBMuO546Kt6SWlSvXY1je4yS7xc46ekfFbYRqJwfIycp/wWeB/7SksHbHkUzCbd1OnlduEVg7Y8loMgPFe56rP3R1C0GL9weYWduTqFGREy4H1R/Ci4UNB5JlfuHyRcM2HkgEI8apJzxquJBiQ5CKI5DctxjBJ3BRKFYucQeBUmdFW3ZZVGYx9v1rHeYTbtgqUnNP3Z+CJjrqeZud+WDI8UGncUJnrBtG6yyT5Jov040zEYo40yxx2/SE5rg/K46y4fNXOIYHRrCDX4mNRxXaeB0QAOu28k+dc3aG8NrHjcJfQ7EXhrS0CMomVm+lNZzKLHNcQT4rbXzKL2BucA7SqLG8FpXFNrOtjL5JJLaoifYPoNdk0mueSZMCeK09+CXGOSosMwqnT6ljKsilw01Pj8Vo6o7TvJSgWR6YgLAfxSOjD5/JekNoEhYH+JtnmNBu+d7Wf3GPzTxVMD3oi9DqT7W2Ic2H1HdaGkgZWlgAmftHlyA4zE+6xIZSHFuu4ykEHmDx2Vm20aCZ1cZknfX5Jl5Y0iwh7RlHPh4yubOfKVs9Jix/jgor0Zuq11zFMEjq3EvcBqZEtA8w6VV1SxhPVdmPtAkl3iTOqusKqMo5qc6SXAvOXM08JO5G0HgFlsFsPpBdnLhTYcvZMS7iD6R7q/HxVt9HO8mc5SSi9k+xx0ueWGeyHAuE5ZPCeBWpw68PUDbY68ZP7CgswumynlY0AfvXxVRdYSdcji0+pA8hwVcqk9aNGLLKEals09zcCQSRDdfIAT+SzDLrJLnnWo4uyjfU9kee2idb4VdVntGhazvGSB4T+iuMPoubUBcwuAkS0SC7bQ8eJ05IKolk5SnXHo0VlDWhsguAExz4/GUG4qgGNFDpMdLusGQyQ0Nq6Ec4aAB8fFGt6gDsj2u1MTMweESq2jSqSJNmA46CfLX5LVYLaBmpdvw4ElVNhgzXO4SJ8DI/ZWuwi1LYB1jnqrMcLZk8nKlFlrZsDWTt4/MqO+8EyNyu4tVik4N37g8SRHsBr6LNis+gAXDNPLgtt0cV72aH6YeaNQvwTB91S0brOJiFyo5NYlF5jB7A8ws5cHtDzCnYniQ+jtJPaDgCqg3Ac5viQo2BIubjunyRsO/JR7w6HyUjDdvREgZw1STnJIBBG48FzrZ4IwY1EYWhbGZaKu3oOaXEiJKknZPxK8aG6ankq76aY2VdUO2ZvpZb53NPKVROshAVzj10S9ohRGUnOGke6olply6I9pZhTPoYR6Fo5u5CkBniPZLY1Fe6zHJCdYhWNRh4EIDrZ54gKWGiHaWgbUBWkpNkuKpjQfIIc1TadeoODTPimQrLVuyxP8QXgVbY8qrD7OC1Na4cwCRvyWc6QYJXxItbTGUNM5zsP1UUk3QOtg6Tjx3Mn3VbjN92gyfE+m3xn+1WuNWda2eOsHZP2x3SY58PIrHYmT1x8WtP/ALnrncGns9DPKpY7j7CViHeK7hbm0i5sQ2oc3k6AJ9QB7KAaxCabnwT0YzQ9YWGDqOBXXEFVFniM9l3oTxUnrI2S0MmaTDnhtERxJJ9z+gSr18rRlHdBIG2w0HxVdYXE0tObvhB/Mp92/QeJaPjJ+AKrrZ0IP4oJWGstMHceI8laWdRleGP7FVpa7+moB90nZ0cFXNIcwRux0f8Ai7/PzVph1j1stPoeR5pkgSZqbO1cXZ4jNJI+74ecq6q3Ap5aYI614zAcQwEBzo83Af8A4obrsW9EVKmrms0YCMz3MaXGJ8ASszeV4u7a/BltaKT9dt2lvgADMLQmoI56xvNLfW6/lrpGoxsucQxpPZ3PidT8IUIsytlxlTqjjqXbkn5qgx69ysyjd5yhWtnOSJOHnNLuZ0U/IoeGMhoCsUYgfZDr2ocIKpmU8twxvAuEK9r1ICoqdbNe02jhJUfYPRo73Y+Sk4X3fRRL07+RUvCO56KwUku3SXHJIEK+7xGlREvcPdU1TpVSf3XwPBV9y63dShgLtI0BdGknUbaJWFK1a3IGw4/Zgz7cloeb6ozKK9kylj1txqAeZ1U+1xShUHYIcAcpI58lTW+AW9QOe+2LnNcQ4nSBw0KtsDoUGNijT6sF0kcyBuq5ZJMujjhXsrcdszU1YB2QSfJZa0vsrpaZEAL0bGHdXQqumctN7o9NlibbE8PFFhfalpLQSOR4quUr02WRj7SLGzvOsboJjdPF21GwOnSrwbZkNBBcNY9VYYlhNpTGdwDnucZYwmROu0/uUlDWVTa7Vb0WsZlaW5nP7R8ByURrbRsfUu3AnePPVGqNL7lu4DfDSB4oLskuhuL0GUnB2wcNvFQ/pLSIDXHyaVOvelNmLg27u1UpgOIAmM23rop9HHKJGjXewR19h+VdEXDrM1DL2kNHAiJV6ymAIAgKuPSOhyd7K6twHtDgCMwmDurItdIqlF9sjGnOnus5jfQm1uHteQ6mWyD1WVoeD94EEeogrXlkLOdNMfZYWzqztYhrRxLjoAi0n2SMnHpnjl3YRe17ZhMUdnGDIOXfQa9r4J38hqn7YHPT/Kl9Ey6v11y/vVqv/wAROnhLo9FoK8BYcrp0js+Lj5QTl7MpT6PgOlznPgyWzkDgDtI11TLu3ILiIa0mWt1MA8Jnb/CvrytlYTyHrJ0HzVebcntO3Ow5BVqTNTwQ9IhYXcOa4tOx7Q8xuPb5Kf8ASczwOUu+AAj3KiVbckyNOK7Xp5GtnV8zygI6YYxcVRc2TZcWjiFucJt2W9J1aqcrGDO5x4D8zwA4yvPsLxunQDj1JfUjslzgGB2upaBJG2khSrrGa9eycKr5BqDK0ABrQBIAA4CeMoqo7FlGU9dIt8Yxk1q1ndAFtMmowUydhnymeElpbKsLrDuocbdx+qrmabj9iqO577HwKzFsM9kxv/XWPoKjRHxYV6RjVp11g4/bptbUB5FkH5IpcrYJzWJxiurr9b0xt8aknKJ/yFmH4JdVLgVH5cje6J+K2gdOvOD7iVyVq4nDbplfb272jYKSZG6M5yiXDijVAuyHfVYBVD0cqdZfE/dB/JTcXr5WO8lV9Ae1Xe7+n5lKuwvo2V4d/IqfhA7Hoq25OqtMKHYKsRWwpSTXJIgPNP5qbSkxlGo+KoNR7A1oAJ0IkidY4ckS3xgmp9IDCx8ZBBbtEJJLPzl9mn8GNLocH3dy8udVLKZOrW7uj7xCnjHvorshpOdAmQWxr5kckkk021G7JCMXLjWiHjvSvr6FSm1jmue3IC7LAkwdiVmMctpY0E+BSSVDm2rL444p0jcfw3quo2417L3GmNJ1GuvxVt0qAp2zHl8F7nQ4N2Lgdfgkkr8buFszZVWSkYdmKspuNBmd7n6uqGBHoVYHGLoNPaaG7T9pJJVym7LoY4pUZXCLHNXc8uJdJJPEkniVtrekWtklJJJFseaSLfoxhXWO61/dB0HMrYlJJbMSqJhzN8qBVHLyz+LI651KkTo2ahHjsPzSSVgi7IOB2jaNuxg4DMfN/aPz+C7cu8YSSXLyds9JgVRSX0ivrtJgFu5adxGnaHxanZgZ304riSVlqdqxrBJ8BqVFrtzOJKSSYBFcztKxq6W7W83E/kuJKMKLnorSzsqM/wDTq/2uj/7r0jA+3aEbgh7R+EiW/B0eiSSuw9mHznr+0CuHZXEctPbRBNwkkrzlDH3J5KFc3DikkoAzPSR5FIzx0RP4cjtVT4NHzXUkF2F9GruD2lcYUPqykkrIlchxSSSRAf/Z",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
    {
      name: "ranveer singhnya",
      role: "Financial Advisor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9hSBe5Zkrz0adu31yTLrGcyYS6T9FppiEg&s",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
    {
      name: "anjali singh",
      role: "Financial Advisor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROiSre_KMmaeCTFW86TuKkO7MXq-euDUSZJg&s",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
  ];

  // React Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992, // Tablet & below
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // Mobile
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 320, // Mobile
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        }
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
<div
  className="banner-section d-flex align-items-center text-center text-white"
  style={{
    position: "relative",
    minHeight: "450px",
    padding: "80px 20px",
    overflow: "hidden",
    backgroundImage:
      "linear-gradient(150deg, rgba(79,70,229,0.8), rgba(59,130,246,0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "inset 0 0 60px rgba(1,1,1,0.5)",

    // borderRadius: "12px",
  }}
>
  {/* Shiny gloss effect */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: "-150%",
      width: "50%",
      height: "100%",
      background:
        "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
      transform: "skewX(-25deg)",
      animation: "shine 10s infinite",
      pointerEvents: "none",
      zIndex: 1,
      borderRadius: "12px",
    }}
  ></div>

  <Container style={{ position: "relative", zIndex: 2 }}>
    <h1
      className="fw-bold display-3"
      style={{
        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
        letterSpacing: "1.5px",
      }}
    >
      Buy & Sell USDT at the Best Rates
    </h1>
    <p
      className="lead mt-3 mb-5"
      style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)", fontSize: "1.35rem" }}
    >
      Secure, Fast, and Transparent — Trusted by thousands.
    </p>
<Button
  size="lg"
  style={{
    background: "linear-gradient(180deg, #059669 0%, #07285eff 100%)",
    border: "none",
    borderRadius: "30px",
    padding: "14px 42px",
    fontWeight: "700",
    color: "#fff",
    boxShadow: "5px 5px 8px 2px rgba(0, 0, 0, 0.4)",
    transition: "all 0.3s ease",
    letterSpacing: "0.5px",
    fontSize: "1.1rem",
  }}
  onClick={handleShowPasswordModal}
  onMouseOver={(e) => {
    e.currentTarget.style.background =
      "linear-gradient(135deg, #9eaac5ff 0%, #031955ff 100%)";
    e.currentTarget.style.boxShadow = "0 12px 28px rgba(59, 130, 246, 0.5)";
  }}
  // onMouseOut={(e) => {
  //   e.currentTarget.style.background =
  //     "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
  //   e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)";
  // }}
>
  🚀 Deposit Now
</Button>

  </Container>

  <style jsx>{`
    @keyframes shine {
      0% {
        left: -150%;
      }
      50% {
        left: 150%;
      }
      100% {
        left: -150%;
      }
    }
  `}</style>
</div>


      {/* Exchange Info */}
      <Container className="py-5">
        <Card className="shadow-lg mb-5 px-4 py-5 rounded-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold fs-2 text-primary">
                Current Exchange Rate
              </h2>
              <p className="text-muted">Auto-refresh in {seconds}s</p>
            </Col>
            <Col md={3} className="text-center mt-4 mt-md-0">
              <Button
                size="lg"
                style={{
                  backgroundColor: "#EF4444",
                  borderColor: "#7b0404ff",
                  borderRadius: "30px",
                  padding: "12px 36px",
                  fontWeight: "600",
                  color: "white",
                  boxShadow: "0 6px 12px rgba(51, 2, 2, 0.6)",
                }}
                onClick={handlesell}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#B91C1C")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
              >
                Sell Now
              </Button>

            </Col>
            <Col md={3} className="text-end mt-4 mt-md-0">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1e2a78",
                }}
              >
                ₹95{" "}
                <Badge bg="warning" text="dark">
                  BASE
                </Badge>
              </div>
              <small className="text-muted">1 USDT = ₹95</small>
            </Col>
          </Row>
        </Card>

        {/* Rates */}
        <Row className="g-4">
          {rates.map((rate, idx) => (
            <Col key={idx} xs={12} md={4}>
              <Card className="text-center shadow-sm rounded-3 py-4">
                <h5 className="fw-bold">${rate.usd}</h5>
                <p className="text-primary fs-5">₹{rate.inr}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
 <Container className="mt-5">
          <h3 className="fw-bold mb-5 text-center text-dark">Testimonials</h3>
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div key={idx} className="px-3">
                <Card
                  className="shadow-lg border-0 rounded-5 p-5 h-100"
                  style={{
                    minHeight: "350px", // Taller cards
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(140, 39, 224, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "rgba(0, 0, 0, 0.1) 0px 4px 6px";
                  }}
                >
                  <div className="mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: "#fbbf24",
                          fontSize: "1.6rem", // Bigger stars
                          marginRight: "2px",
                          filter: "drop-shadow(0 0 2px #fbbf24)",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-muted"
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.6",
                      minHeight: "120px",
                      marginBottom: "2.5rem",
                      fontStyle: "italic",
                      color: "#555",
                    }}
                  >
                    {item.text}
                  </p>
                  <div className="d-flex align-items-center mt-auto">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="rounded-circle me-3"
                      style={{
                        width: "65px",
                        height: "65px",
                        border: "3px solid #8c27e0",
                        boxShadow: "0 0 10px rgba(140, 39, 224, 0.6)",
                      }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold" style={{ color: "#241654" }}>
                        {item.name}
                      </h6>
                      <small className="text-muted">{item.role}</small>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </Container>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#25D366",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "32px", height: "32px" }}
        />
      </a>


{/* Password Modal */}
<Modal
  show={showPasswordModal}
  onHide={handleClosePasswordModal}
  centered
  backdrop="static"
  keyboard={false}
  dialogClassName="password-modal"
>
  <Modal.Header closeButton className="border-0">
    <Modal.Title className="text-black fw-bold" style={{ fontSize: "1.8rem" }}>
      🔐 Enter Your 6-Digit Password
    </Modal.Title>
  </Modal.Header>
  <Modal.Body
    style={{
      background:"rgba(10, 10, 20, 0.8)",
      borderRadius: "12px",
      boxShadow: "0 8px 3px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(37, 4, 93, 0.18)",
      color: "#fff",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        marginBottom: "1.5rem",
        animation: "pulse 2s infinite",
        fontSize: "3rem",
      }}
      aria-hidden="true"
    >
      🔒
    </div>
    <Form
      style={{
        width: "100%",
        maxWidth: "320px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handlePasswordSubmit();
      }}
    >
      <Form.Group controlId="formPassword" className="mb-4">
        <Form.Label
          className="fw-semibold"
          style={{
            fontSize: "1.2rem",
            letterSpacing: "1px",
          }}
        >
          Password
        </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit password"
          autoFocus
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            borderRadius: "30px",
            border: "2px solid #6e57f7",
            backgroundColor: "rgba(30, 30, 60, 0.8)",
            color: "#fff",
            boxShadow: "0 0 10px #6e57f7",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "#a08fff")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "#6e57f7")
          }
          pattern="\d{6}"
          title="Please enter exactly 6 digits"
          inputMode="numeric"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="w-100 fw-bold"
        style={{
          backgroundColor: "#6e57f7",
          borderRadius: "30px",
          padding: "12px 0",
          fontSize: "1.25rem",
          boxShadow: "0 8px 15px rgba(110, 87, 247, 0.5)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          border: "none",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#a08fff";
          e.currentTarget.style.boxShadow =
            "0 15px 25px rgba(160, 143, 255, 0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#6e57f7";
          e.currentTarget.style.boxShadow =
            "0 8px 15px rgba(110, 87, 247, 0.5)";
        }}
      >
        Unlock
      </Button>
    </Form>
  </Modal.Body>

  <style jsx>{`
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .password-modal .modal-content {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    .password-modal .btn-close {
      filter: invert(1);
      opacity: 0.75;
      transition: opacity 0.3s ease;
    }
    .password-modal .btn-close:hover {
      opacity: 1;
    }
  `}</style>
</Modal>


      {/* BIGGER FULL PAGE DEPOSIT MODAL */}
      {showDepositModalPage && (
        <div
          onClick={handleDepositModalOutsideClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            ref={depositModalRef}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <h4 className="mb-4 text-primary fw-bold text-center">
              Enter Deposit Amount & Network
            </h4>
            <Form>
              <Form.Group controlId="networkSelect" className="mb-3">
                <Form.Label>Select Network</Form.Label>
                <Form.Select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="erc20">ERC20</option>
                  <option value="bep20">BEP20</option>
                  <option value="trc20">TRC20</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="amountInput" className="mb-4">
                <Form.Label>Amount (USDT)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter amount"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleDepositRedirect}
                >
                  Continue to Deposit
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowDepositModalPage(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
