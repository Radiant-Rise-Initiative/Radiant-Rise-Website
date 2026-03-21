export interface NewsItem {
    id: string;
    category: string;
    date: string;
    title: string;
    image: string;
    content?: string;
    author?: string;
    readTime?: string;
}

export const newsItems: NewsItem[] = [
    {
        id: "vocational-hub",
        category: "INITIATIVE",
        date: "FEB 15, 2024",
        title: "Radiant Rise Launches New Vocational Empowerment Hub for Young Mothers",
        image: "/assets/images/news_images/newsletter_01.jpg",
        author: "Sarah Namukasa",
        readTime: "4 min read",
        content: `
            <p>We are thrilled to announce the official opening of the <strong>Radiant Rise Vocational Empowerment Hub</strong> in the heart of Acholi Quarters. This milestone represents a significant step forward in our mission to provide sustainable economic pathways for young mothers.</p>
            
            <h3>A Space for Growth</h3>
            <p>The hub is equipped with modern tailoring machines, a dedicated digital literacy corner, and a safe space for childcare, allowing mothers to focus on their training without worry. "This isn't just a training center," says Program Director John Doe, "it's a sanctuary for transformation."</p>
            
            <blockquote>
                "Having a place where I can learn a skill and still be close to my child is a dream come true." — <em>Mariam, Hub Participant</em>
            </blockquote>
            
            <h3>Strategic Partnerships</h3>
            <p>Through our partnership with Fine Spinners, the hub will serve as a direct pipeline to formal employment. Participants who complete the six-month certification program are guaranteed an interview and placement support.</p>
            
            <p>Join us as we celebrate this new chapter of community-led development. Together, we are rising.</p>
        `
    },
    {
        id: "trauma-circles",
        category: "IMPACT",
        date: "JAN 28, 2024",
        title: "Healing Through Storytelling: Over 100 Participants Join Our Trauma-Informed Counseling Circles",
        image: "/assets/images/news_images/newsletter_02.jpg",
        author: "Dr. Elizabeth Akello",
        readTime: "5 min read",
        content: `
            <p>Economic stability is impossible without emotional stability. Over the past month, our <strong>Trauma-Informed Counseling Circles</strong> have reached a major milestone, with over 100 young residents participating in weekly sessions.</p>
            
            <h3>The Power of Shared Experience</h3>
            <p>Led by certified counselors and peer mentors, these circles provide a safe environment for participants to process experiences of displacement, loss, and the daily pressures of urban poverty. We use storytelling as a primary tool for externalizing internal struggles.</p>
            
            <h3>Breaking the Stigma</h3>
            <p>Mental health remains a sensitive topic in many communities. By integrating these sessions into our vocational pathways, we are normalizing the pursuit of emotional well-being. "Healing is the foundation of resilience," notes Dr. Akello, lead psychologist.</p>
            
            <p>We invite you to read more about our specific counseling techniques and how you can support the expansion of these vital services.</p>
        `
    },
    {
        id: "community-grant",
        category: "PARTNERSHIP",
        date: "DEC 12, 2023",
        title: "Scaling Grassroots Change: Securing Community Grants to Uplift Vulnerable Youths",
        image: "/assets/images/news_images/newsletter_03.jpg",
        author: "Michael Okello",
        readTime: "3 min read",
        content: `
            <p>We are proud to share that Radiant Rise Initiative has been awarded a prestigious community development grant. This funding is dedicated specifically to the expansion of our <strong>Youth Digital Skills Program</strong>.</p>
            
            <h3>Investing in the Future</h3>
            <p>The grant will allow us to purchase 15 new laptops and hire two dedicated instructors specialized in graphic design and basic coding. This ensures that the youth of Acholi Quarters are not left behind in the global digital economy.</p>
            
            <h3>Community-Led Stewardship</h3>
            <p>In line with our values, the allocation of these funds was discussed in a town hall meeting with local leaders. We believe that transparency and community oversight are key to long-term success.</p>
            
            <p>Stay tuned for updates on our first cohort of digital graduates early next year!</p>
        `
    },
];
