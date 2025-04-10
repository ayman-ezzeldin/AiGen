import { motion } from "framer-motion";

const Footer = ({ title, paragraph, linkLabel, linkHref, buttonLabel, buttonLink }) => {
    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 25, duration: 0.8 },
        },
    };

    return (
        <motion.footer
            className="bg-gray-100 text-center py-6 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
        >
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{paragraph}</p>
                <a href={linkHref} className="text-blue-600 hover:underline block mb-3">
                    {linkLabel}
                </a>
                <a href={buttonLink} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
                    {buttonLabel}
                </a>
            </div>
        </motion.footer>
    );
};

export default Footer;
