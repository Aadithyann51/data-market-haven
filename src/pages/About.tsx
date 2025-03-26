
import BlurContainer from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Zap, Globe, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-white to-secondary/30 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block animate-fade-in">
            About DataMarket
          </span>
          
          <h1 className="heading-xl mb-6 animate-fade-in">
            Our Mission
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 animate-fade-in">
            We're building the most trusted marketplace for IoT data, 
            connecting data providers with businesses and researchers who need it.
          </p>
        </div>
      </section>
      
      {/* Story section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-primary font-medium mb-3 inline-block">Our Story</span>
              <h2 className="heading-lg mb-6">From Idea to Innovation</h2>
              <p className="text-muted-foreground mb-4">
                DataMarket was founded in 2023 with a simple vision: to create a platform where IoT data could be exchanged securely and transparently. We recognized the tremendous value locked in IoT sensors and devices worldwide, and built the infrastructure to unlock it.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we serve thousands of businesses, researchers, and organizations, helping them buy and sell IoT data that drives innovation and decision-making across industries.
              </p>
              <Link to="/register">
                <Button>Join Our Community</Button>
              </Link>
            </div>
            
            <BlurContainer className="h-full flex items-center justify-center p-10">
              <div className="aspect-square relative bg-gradient-to-r from-primary/5 to-primary/20 rounded-3xl w-full flex items-center justify-center">
                <div className="absolute inset-0 blur-xl bg-primary/5 rounded-3xl"></div>
                <div className="z-10 text-center">
                  <h3 className="text-3xl md:text-5xl font-bold text-primary mb-3">2023</h3>
                  <p className="text-lg font-medium">Founded</p>
                </div>
              </div>
            </BlurContainer>
          </div>
        </div>
      </section>
      
      {/* Values section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-medium mb-3 inline-block">Our Values</span>
            <h2 className="heading-lg mb-6">What Drives Us</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              At DataMarket, our values shape everything we do. They guide our product development, customer relationships, and vision for the future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BlurContainer>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-muted-foreground">
                We prioritize the security and privacy of all data exchanged on our platform.
              </p>
            </BlurContainer>
            
            <BlurContainer>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform to meet the evolving needs of our users.
              </p>
            </BlurContainer>
            
            <BlurContainer>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                We make IoT data accessible to organizations of all sizes, from startups to enterprises.
              </p>
            </BlurContainer>
            
            <BlurContainer>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We foster a community of data providers and consumers who share knowledge and insights.
              </p>
            </BlurContainer>
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-medium mb-3 inline-block">Our Team</span>
            <h2 className="heading-lg mb-6">The People Behind DataMarket</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              We're a diverse team of engineers, designers, and data scientists, united by our passion for IoT and data exchange.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <BlurContainer key={i} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">{i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">Team Member {i}</h3>
                <p className="text-primary mb-3">Co-founder & {i === 1 ? 'CEO' : i === 2 ? 'CTO' : 'COO'}</p>
                <p className="text-muted-foreground text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at metus tristique, finibus sapien eu.
                </p>
              </BlurContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Join the DataMarket Community</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
            Whether you're looking to monetize your IoT data or find the perfect dataset for your next project, DataMarket has you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Create an Account</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
