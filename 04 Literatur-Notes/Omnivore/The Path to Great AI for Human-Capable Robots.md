---
id: b12b2a8b-9685-41b2-872d-e418327f87bc
title: |
  The Path to Great AI for Human-Capable Robots
author: |
  Brad Porter
topics: 
aliases: 
created: 2024-02-09 18:35:23
published: 2024-02-05 01:40:01
URL: https://medium.com/@bp_64302/the-path-to-great-ai-for-human-capable-robots-a7e12033289c
Omnivore-URL: https://omnivore.app/me/the-path-to-great-ai-for-human-capable-robots-by-brad-porter-feb-18d8ef032be
related: 
---

```dataviewjs
await dv.view("02 Dateien/Javascript/related_write")
```
> [!example]- In diesem Zusammenhang:
> %% INSERT A %%%% END A %%

# The Path to Great AI for Human-Capable Robots

> [!info] Info
> **Brad Porter**
> 
> My favorite scene in Star Wars is where Chewbacca lets out a Wookie howl and a small toaster size mouse droid chirps and scoots backwards to run away. Imagine everything that goes into that? The…


## Inhalt

![](https://proxy-prod.omnivore-image-cache.app/700x330,sQkFdsmXFL959LihKiFdSTWPE1LeAXyaaGyoLbD2nzRs/https://miro.medium.com/v2/resize:fit:1400/1*BcMcvCPo2__MSvWJ7pXOMw.png)

Karl Sims’s Evolved Virtual Creatures Solving Tasks

My favorite scene in Star Wars is where Chewbacca lets out a Wookie howl and [a small toaster size mouse droid chirps and scoots backwards to run away](https://www.youtube.com/watch?v=cLqNmMH4hsg). Imagine everything that goes into that? The robot needs to recognize that the thing making that sound is a scary intimidating creature that could crush it. It needs to have a reaction of fear. And it needs to wheel its way backward and run away.

Our robots today do not have this level of comprehension or control. As a result, they don’t look natural. Robots today generally look stiff and unnatural. Or they sit in this weird uncanny valley where they’re trying to look natural, but don’t quite achieve that.

## Early Work in Simulation and Genetic Algorithms

In 1994, Karl Sims wrote the paper “[Evolving Virtual Creatures](https://dl.acm.org/doi/pdf/10.1145/192161.192167)” which showed novel block creatures that learned to move through water and on ground. Karl demonstrated the idea of using genetic algorithms to evolve the creatures and their motion actuation. [The video is still mesmerizing 30 years later.](https://www.youtube.com/watch?v=JBgG%5FVSP7f8)

This work demonstrated that novel creatures with novel actuation and novel controls could learn to complete tasks like moving forward or turning. By building in simulation, Karl Sims could run lots of iterations and experiments until novel creatures emerged. Further, the genetic algorithm demonstrated that you could converge to something better and better by taking what worked before and evolving it.

## The Emergence of Reinforcement Learning

Dr Rich Sutton is credited with inventing the concepts behind Reinforcement Learning in his dissertation published in 1984\. In his own words, “Reinforcement learning is learning from rewards, by trial and error, during normal interaction with the world.” This has since been adapted to learning in simulated worlds much like Karl Sims work.

> The first big challenge with Reinforcement Learning is that it’s expensive to do lots of trial and error.

Reinforcement Learning re-emerged as a hot area of exploration when[ DeepMind demonstrated they could teach a system to play Atari games](https://www.cs.toronto.edu/~vmnih/docs/dqn.pdf), by taking input video frames and generating controls outputs that mimic the controls of a joystick ([video](https://www.youtube.com/watch?v=2nonlRp3vT0&list=PLOkmXPXHDP22Lh0AAmRi7N5RlJzK68mpy)).

This was a pivotal moment, showcasing RL’s ability to learn and optimize behavior through trial and error, achieving superhuman performance in games like “Breakout.” The success with Atari games was not just about mastering the games themselves but about proving that machines could learn complex tasks from scratch, using only raw visual input and feedback from the game environment.

Building on this momentum, [OpenAI’s work on DOTA 2](https://cdn.openai.com/dota-2.pdf), a complex multiplayer online battle arena game, marked a significant leap forward ([video](https://www.youtube.com/watch?v=l92J1UvHf6M)). The OpenAI Five, a team of neural networks trained via RL, demonstrated the ability to compete against and defeat human players at a professional level. This achievement underscored RL’s capacity to handle tasks of increased complexity and dynamics, involving strategic planning, teamwork, and real-time decision-making against unpredictable opponents.

[OpenAI’s Learning Dexterity](https://arxiv.org/pdf/1808.00177.pdf) project further expanded the boundaries of what RL could accomplish. By training a robotic hand to manipulate physical objects with dexterity approaching that of a human hand, the project highlighted RL’s potential in physical tasks requiring fine motor control and adaptability ([video](https://www.youtube.com/watch?v=jwSbzNHGflM)). This project was particularly notable for its use of a simulated environment to train the hand before transferring those skills to the real world, a technique known as sim-to-real transfer.

## Working Around the Limitations of Reinforcement Learning

The first big challenge with Reinforcement Learning is that it’s expensive to do lots of trial and error. Especially in the early phases of learning, lots of the tested hypotheses are really bad. And so trying to differentiate bad from bad to figure out which got close to the goal is hard. Also, the number of trial and errors you need goes with the number of actuators. This can be thought of as a bootstrapping problem… how do you get the model to start at a place where reinforcement learning can be more efficient?

> Just because you learned to open a door handle, doesn’t mean you can open any other door handle.

There are various techniques to help with this problem:

1. **Simulation First:** Do all your trials in simulation to try to get closer to a working solution before you try to make it work in the real world.
2. **Imitation Learning:** Use some other technique to try to get a base-line model before doing refinement with reinforcement learning. One technique for this is to have a human control the actuators, often with a gaming controller, and then train from there. Or to imitate from video as demonstrated in “[One-shot Imitation from Observing Humans via Domain-Adaptive Meta-Learning](https://arxiv.org/pdf/1802.01557.pdf)”. Recently, in their paper “[SloMo: A General System for Legged Robot Motion Imitation from Casual Videos](https://arxiv.org/pdf/2304.14389.pdfrg/pdf/2304.14389.pdf)” researchers at the Robotics Institute at CMU showed the ability to learn from casual video of dogs and cats and transfer that to a legged robot ([video](https://youtu.be/bvoM-nBd7lM)).
3. **Reduce the Dimensionality of the Actuator Space:** Human hands have 40+ dimensions of control and devices like the Shadow Hand used in the OpenAI Detrous Manipulation project have 26 dimensions. Columbia created “eigengrasps” to try to simplify the grasping space to a lower-dimensional problem of transitioning from known grasp states.
4. **Simplify the Problem:** Even simpler, and widely used in robotic picking, is to simply use very high-flow suction to make it easier to pick up anything without needing to worry about gripping the item. Agility designed the legs of its robots to make the leg controller modelable as a spring-mass pendulum, simplifying the controls challenge ([Jonathan Hurst’s thesis describes this](https://mime.engineering.oregonstate.edu/research/drl/%5Fdocuments/hurst%5F2008a.pdf)).
5. **Behavior Cloning:** If you have one system that demonstrably works, you try to get another system to clone that behavior, perhaps using supervised learning techniques initially.

The second big challenge with Reinforcement Learning is that it’s not super robust and can overfit the solution to the specified reward. For instance, if you want to train a humanoid robot to shoot a basket, if the goal is simply to make a basket, the robot will learn to toss underhand as that is more successful. But if you want it to look like a human would shoot a basket, you need a more sophisticated reward function that both rewards making the basket and looking like a human.

1. **Domain Randomization:** By perturbing the input space and trying to achieve the same goal, you can hopefully make the model more robust.
2. **Human Preference:** Humans often have a more nuanced version of what success should look like. So instead of rewarding the system with meeting some objective, you can reward the system by doing what the human preferred, usually by showing humans two examples side-by-side and asking which is better.

The third biggest challenge with Reinforcement Learning is that you’re only learning one task at a time! Just because you learned to open a door handle, doesn’t mean you can open any other door handle. In fact, it doesn’t even mean you can open a door handle 2 inches lower. This problem simply isn’t well solved at all. We have some work-arounds:

1. [**Sequential Composition of Dynamically Dextrous Robot Behaviors**](https://kodlab.seas.upenn.edu/uploads/Kod/Sequential1999.pdf)**:** This paper derives a technique for transitioning from one control regime to another smoothly, but transitioning when there’s an overlap between one control regime and another. This is an incredibly insightful paper. Boston Dynamics is believed to use this or an evolution of this technique to be able to get Atlas to perform parkour routines ([video](https://www.youtube.com/watch?v=tF4DML7FIWk)).
2. **Constrain the Environment:** If you restrict the task to a very specific situation, you greatly simplify the problem. For instance, grasping in the world at large is very hard. But if you constrain to just picking items out of a bin, you simplify the problem substantially and then can just learn one task. Similarly, you might just change all the door knobs to meet what your robot can do.

This last problem is a HUGE problem in robotics and not one that is well understood outside the robotics community. We see demos all the time of really impressive robotic actions and as humans, we immediately assume a robot that can do a backflip could also do monkey bars, because we know a 7 year old that can do a backflip probably has no problem with monkey bars. But robots can’t. If the robot wasn’t trained to do monkey bars, it’s not going to have any ability at all to do that.

Trying to learn everything that a human can do one task at a time will take us forever.

## The Role of Data

In supervised learning, where we try to devise a model to produce the same results as test set of known good answers, the more data we have the better. Much of the early progress in speech recognition was through supervised learning. At Tellme, there was a period where we had better speech recognition than Nuance, even though we were using Nuance’s speech recognition engine, simply because we had more data.

> The problem in robotics is that unlike text, speech, images, or video from cars, we simply don’t have a lot of robots running around collecting data.

This has led to people assuming that more data wins. To some extent that is still true, but if you’re trying to do supervised learning, you need a test set. And the output results are only as good as the size of your test and training set, which makes you want more and more data. This is a lot of the early work Scale AI did, helping self-driving car companies build labeled datasets that showed where all the cars, stop signs, pedestrians, traffic cones, etc. were. These training sets are incredibly expensive to build and the results aren’t as good as we would hope.

To get around this, researchers have figured out how to fuse some amount of labeled data with large corpuses of unlabeled data. For instance, [Amazon improved it’s acoustic model for speech by using 7,000 hours of labeled speech and a million hours of unlabeled speech](https://assets.amazon.science/41/b6/183ad86348b884f8c9713cf106ce/lessons-from-building-acoustic-models-with-a-million-hours-of-speech.pdf). Tesla claims to have enough labeled data to do auto-labeling now, but that information is sparse.

Great, so more data wins? Well kind of, expect maybe not so much in robotics. The problem in robotics is that unlike text, speech, images, or video from cars, we simply don’t have a lot of robots running around collecting data. Most of the data we have in the world is the output of something humans did… we wrote, we spoke, we took a picture, we drove.

Imagine trying to build a self-driving car, if you couldn’t capture any data from a human driving down the road? Further imagine that a car that wasn’t self-driving wasn’t very useful. That’s the problem we have with robots. Robots that can’t do a wide range of dextrous tasks are fundamentally less useful, but we don’t have great ways to capture data from humans doing things in the real world.

To some extent, we’ve tried this by wearing motion capture suits, or we use a rig like [Mobile Aloha](https://arxiv.org/pdf/2401.02117.pdf) to capture this data ([video](https://www.youtube.com/watch?v=HaaZ8ss-HP4)).

One theory on how we get there is that we’ll start with very complex robots doing very simple work and then they’ll iteratively improve, like we did with speech recognition. This argument sounds good, but doesn’t really make any sense. It’s incredibly expensive to use a complex robot to do a simple task, so we’re not going to deploy many of those, which means we won’t have that much data.

Another challenge though, is the world is incredibly complex. Even with millions of labeled items, autonomous vehicles still run into situations they’ve never seen before. Years and years of data labeling and classic techniques haven’t yielded a driverless car that generalizes beyond a couple of cities.

## Transformers and Tokens

The Transformer Architecture has been a breakthrough in generating far better models. The transformer architecture works by looking at sequences of tokens and finding patterns to be able to predict the next token. The transformer architecture has been ChatGPT 4 is trained from 13 trillion tokens (effectively “words”) from large corpuses of data collected from the internet. We have lots of text and that text is structured nicely into token sequences.

> We don’t have enough robots producing tokens to build up a serious repository of tokens.

While we think of ChatGPT as producing next-word text, we can also do token-to-token translation, which has made machine translation of text and speech incredibly good.

The art to transformers though is to figure out how to tokenize the space into something that is amenable to transformer architecture. In robotics, these tokens can be action streams. [TRI’s recent Diffusion Polic](https://arxiv.org/pdf/2303.04137.pdf)y work does this with great results in accelerating the development of robust controls. But they still are learning one control policy at a time.

But to really generalize, we need lots and lots of tokens. We don’t have enough robots producing tokens to build up a serious repository of tokens.

## Sources of Tokens

One source of tokens is simply to come up with a common representation for robotic motions so we can share tokens between researchers. Chelsea Finn and other researchers are starting to do this. The challenge remains getting enough tokens to be interesting

Another potential source of tokens is to use the latent understanding of large-language models to generate motion plans that can then be fed into a simulator and then extract tokens of motion from that simulation. If there are papers trying this, I haven’t come across them yet, but the world model learned by ChatGPT continues to surprise us and may have a deep intrinsic understanding of motion. Even if it doesn’t today, multi-modal models trained from video and imagery will likely have better and better intrinsic understanding of motion.

> the best approach is to get a highly-capable robot into the field now, but not constrained to the humanoid form-factor, but capturing data from a human vantage point of human-related tasks in the real-world.

Another source may be the rich corpus of video that already exists. In the mid-90s, I did my masters thesis work in the Graphics Lab of MIT’s famous Lab for Computer Science. Professor Seth Teller was my thesis advisor. While my thesis was more in the space of leveraging the web as a teaching platform for computer graphics, [my lab mate was building a robotic data collection rig for city mapping](http://city.csail.mit.edu/). The city mapping project used computational geometry to reconstruct 3D geometry from 2D images collected with this data capture rig.

These same computational geometry techniques form the basis for SLAM (Simultaneous Localization and Mapping) which is how today’s robots can navigate the world around us by reconstructing 3D geometry from 2D video. We can also track skeletons and reconstruct human motion with similar techniques.

This creates a latent source for lots of tokens of motion.

## Implications for Building Human-Capable Robots

Today we have a chicken-and-egg problem. Our models aren’t good enough to robustly control a humanoid robot for complex real-world interactions both on the balancing and manipulation front. As much as Boston Dynamics can show a great composition of tasks and Agility can show very robust walking dynamics and research labs can show quadrapeds doing cool scrabble up and over boxes, we still can’t generalize robustly to novel situations or new tasks.

But if these complicated robots can’t do meaningful work without more robust controls that generalize better, then we’re simply not going to have that many deployed, limiting the amount of data we can capture.

As I described in my previous article on The Path to Human-Capable Robots, I think the best approach is to get a highly-capable robot into the field now, but not constrained to the humanoid form-factor, but capturing data from a human vantage point of human-related tasks in the real-world.

By combining the intrinsic knowledge in LLMs, with extracted tokens from video, with a small amount of real-world data all reconstituted in simulation, we will be able to start to build that foundation model for robotic controls that will eventually enable ANY robotic form-factor in the same way LLMs have learned to speak any language with token-to-token translation. We will then be able to use the techniques from Diffusion Policies along with human-guided guided coaching of multi-model controls-enabled foundation models, to be able to coach robots to perform any task like we would a 7 year old.

I’m excited for that future. Our cobots, while useful already, will become even more capable collaborators as these foundation models become available.

## Other Interesting Papers & Talks:

[Chelsea Finn — Generalization & Dexterity in Robot Learning presentation at MIT Oct 23, 2023](https://www.youtube.com/watch?v=evNJV5v6o-w)

[Russ Tedrake — Princeton Robotics — Russ Tedrake — Dexterous Manipulation with Diffusion Policies](https://www.youtube.com/watch?v=whpK0HDtOJ0)

[Pieter Abbeel on building a foundation model for robotic piece-picking](https://www.youtube.com/watch?v=-9%5F7t6BlOyY)

[Chelsea Finn & Pieter Abbeel S3 E2 Stanford Prof Chelsea Finn: How to build AI that can keep up with an always changing world](https://www.youtube.com/watch?v=ZD15OtMbaNw)

_Brad Porter is the CEO and Founder of Collaborative Robotics, Inc, a Sequoia, Khosla and Mayo Clinic backed robotics company headquartered in Santa Clara, California. Prior to founding Cobot, Brad was the Vice President and Distinguished Engineer leading a global team of 10,000 people overseeing robotics for all of Amazon’s logistics network. Brad also served as CTO of Scale AI, Platform Architect for Tellme Networks and an early engineer at Netscape. Brad holds a Bachelors and Masters in Computer Science from MIT. His research focused on computer graphics under Professor Seth Teller._