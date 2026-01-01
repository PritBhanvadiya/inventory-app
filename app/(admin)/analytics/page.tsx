import AnalyticsHeader from "./components/AnalyticsHeader";
import ProductInsightsSection from "./components/InsightsSection/ProductInsightsSection";
import TrendsSection from "./components/TrendsSection/TrendsSection";

export default function Page() {
    return (
        <>
            <AnalyticsHeader />
            <TrendsSection />
            <ProductInsightsSection />
        </>
    )
}